import { h, nextTick } from 'vue';
import manager from './manager';

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
            this.elementId = uid;
            nextTick().then(() => {
                this.player = new factory.Player(this.elementId, {
                    width: playerWidth,
                    height: playerHeight,
                    ...playerParameters,
                    videoId,
                    host: 'https://www.youtube.com',
                    events: {
                        onReady: (event) => {
                            const p = event.target;
                            if (playerParameters.autoplay === 1) {
                                p.mute();
                                if (playerParameters?.start !== 0) {
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

export default player;
