<template>
    <div :id="elementId"></div>
</template>

<script>
import manager from './manager';

let uid = 0;

export default {
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
        uid += 1;
        return {
            elementId: `vue-youtube-iframe-${uid}`,
            player: {},
        };
    },
    template: '<div :id="elementId"></div>',
    mounted() {
        console.log('Mounted');
        const params = this.playerParameters;

        manager.register((YTFactory) => {
            console.log(YTFactory);
            this.player = new YTFactory.Player(this.elementId, {
                width: this.playerWidth,
                height: this.playerHeight,
                params,
            });
        });
    },
};
</script>
