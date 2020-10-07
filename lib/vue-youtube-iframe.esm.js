// Copyright © 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-youtube-iframe 1.0.2
import { h, nextTick } from 'vue';

const manager = {
    factory: null,
    players: [],
    events: {},
    uid: 0,

    // registerFactory registers the YT Factory (e.g. create a new Player)
    registerFactory(YT) {
        this.factory = YT;
    },

    // registerEvents registers the YT Player events to be emitted by the component
    registerEvents() {
        const { PlayerState } = this.factory;
        this.events[PlayerState.ENDED] = 'ended';
        this.events[PlayerState.PLAYING] = 'playing';
        this.events[PlayerState.PAUSED] = 'paused';
        this.events[PlayerState.BUFFERING] = 'buffering';
        this.events[PlayerState.CUED] = 'cued';
    },

    // register registers a new player to be initalizied and runs callback
    register(callback) {
        this.uid += 1;
        if (this.factory) {
            callback(this.factory, `vue-youtube-iframe-${this.uid}`);
            return;
        }
        this.players.push(callback);
    },

    // runBacklog runs backlogged initializations (when the YT factory wasn't set yet)
    runBacklog() {
        this.players.forEach((callback) => {
            callback(this.factory, `vue-youtube-iframe-${this.uid}`);
        });
        this.players = [];
    },
};

const player = {
    name: 'YoutubeIframe',
    props: {
        playerWidth: {
            type: [String, Number],
            default: '1280',
        },
        playerHeight: {
            type: [String, Number],
            default: '720',
        },
        playerParameters: {
            type: Object,
            default: () => ({
                autpplay: 0,
                time: 0,
                mute: 0,
            }),
        },
        videoId: {
            type: String,
            default: '',
        },
        noCookie: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            elementId: '',
            player: {},
        };
    },
    render() {
        return h('div', [h('div', { id: this.elementId })]);
    },
    template: '<div><div :id="elementId"></div></div>',
    mounted() {
        const { playerHeight, playerWidth, playerParameters, videoId } = this;

        manager.register((factory, uid) => {
            const host = this.noCookie
                ? 'https://www.youtube-nocookie.com'
                : 'https://www.youtube.com';
            this.elementId = uid;

            nextTick().then(() => {
                this.player = new factory.Player(this.elementId, {
                    width: playerWidth,
                    height: playerHeight,
                    ...playerParameters,
                    videoId,
                    host,
                    events: {
                        onReady: (event) => {
                            const p = event.target;
                            if (
                                playerParameters.autoplay !== 'undefined' &&
                                playerParameters.autoplay === 1
                            ) {
                                p.mute();
                                if (
                                    playerParameters.start !== 'undefined' &&
                                    playerParameters.start !== 0
                                ) {
                                    p.seekTo(playerParameters.start);
                                } else {
                                    p.playVideo();
                                }
                            }
                            this.$emit('ready', event);
                        },
                        onStateChange: (event) => {
                            if (event.data !== -1) {
                                this.$emit(manager.events[event.data], event);
                            }
                        },
                        onError: (event) => {
                            this.$emit('error', event);
                        },
                    },
                });
            });
        });
    },
};

const plugin = {
    install: (app) => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/player_api';

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            app.component('youtube-iframe', player);

            window.onYouTubeIframeAPIReady = () => {
                manager.registerFactory(window.YT);
                manager.registerEvents();
                manager.runBacklog();
            };
        }
    },
};

export default plugin;
export { player as YouTubePlayer };
