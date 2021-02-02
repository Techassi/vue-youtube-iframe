// Copyright (c) 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-youtube-iframe 1.0.3
(function (exports, vue) {
    'use strict';

    function createManager() {
        return {
            factory: undefined,
            players: [],
            events: {},
            uid: 0,
            registerFactory(factory) {
                this.factory = factory;
            },
            registerEvents() {
                this.events[YT.PlayerState.ENDED] = 'ended';
                this.events[YT.PlayerState.PLAYING] = 'playing';
                this.events[YT.PlayerState.PAUSED] = 'paused';
                this.events[YT.PlayerState.BUFFERING] = 'buffering';
                this.events[YT.PlayerState.CUED] = 'cued';
            },
            register(callback) {
                this.uid++;
                if (this.factory != undefined) {
                    callback(this.factory, `vue-youtube-iframe-${this.uid}`);
                    return;
                }
                this.players.push(callback);
            },
            runBacklog() {
                this.players.forEach((callback) => {
                    if (this.factory != undefined) {
                        this.uid++;
                        callback(this.factory, `vue-youtube-iframe-${this.uid}`);
                    }
                    this.players = [];
                });
            },
        };
    }
    const manager = createManager();

    function skipIfAutoplay(player, playerVars) {
        if (playerVars.autoplay != undefined &&
            playerVars.autoplay == YT.AutoPlay.AutoPlay) {
            player.mute();
            if (playerVars.start != undefined && playerVars.start != 0) {
                player.seekTo(playerVars.start, true);
            }
            else {
                player.playVideo();
            }
        }
    }

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
                    autoplay: 0,
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
            return vue.h('div', [vue.h('div', { id: this.elementId })]);
        },
        template: '<div><div :id="elementId"></div></div>',
        mounted() {
            const { playerHeight, playerWidth, playerParameters, videoId } = this;
            manager.register((factory, uid) => {
                const host = this.noCookie
                    ? 'https://www.youtube-nocookie.com'
                    : 'https://www.youtube.com';
                this.elementId = uid;
                vue.nextTick().then(() => {
                    this.player = new factory.Player(this.elementId, {
                        width: playerWidth,
                        height: playerHeight,
                        ...playerParameters,
                        videoId,
                        host,
                        events: {
                            onReady: (event) => {
                                skipIfAutoplay(event.target, playerParameters);
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
                if (firstScriptTag.parentNode != null) {
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    app.component('youtube-iframe', player);
                    window.onYouTubeIframeAPIReady = () => {
                        manager.registerFactory(window.YT);
                        manager.registerEvents();
                        manager.runBacklog();
                    };
                }
            }
        },
    };

    exports.YouTubePlayer = player;
    exports.default = plugin;

    return exports;

}({}, vue));
