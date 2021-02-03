import { defineComponent, h, nextTick } from 'vue';

import { seekIfAutoplay } from './helper';
import { manager } from './manager';

const player = defineComponent({
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
            player: {} as YT.Player,
        };
    },
    render() {
        return h('div', [h('div', { id: this.elementId })]);
    },
    template: '<div><div :id="elementId"></div></div>',
    methods: {
        cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: YT.SuggestedVideoQuality): void {
            this.player.cueVideoById(videoId, startSeconds, suggestedQuality);
        },
        loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: YT.SuggestedVideoQuality): void {
            this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
        },
        cueVideoByUrl(
            mediaContentUrl: string,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.cueVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality);
        },
        loadVideoByUrl(
            mediaContentUrl: string,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.loadVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality);
        },
        cuePlaylist(
            playlist: string | string[],
            index?: number,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.cuePlaylist(playlist, index, startSeconds, suggestedQuality);
        },
        loadPlaylist(
            playlist: string | string[],
            index?: number,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.loadPlaylist(playlist, index, startSeconds, suggestedQuality);
        },
        playVideo(): void {
            this.player.playVideo();
        },
        pauseVideo(): void {
            this.player.pauseVideo();
        },
        stopVideo(): void {
            this.player.stopVideo();
        },
        seekTo(seconds: number, allowSeekAhead: boolean): void {
            this.player.seekTo(seconds, allowSeekAhead);
        },
        nextVideo(): void {
            this.player.nextVideo();
        },
        previousVideo(): void {
            this.player.previousVideo();
        },
        playVideoAt(index: number): void {
            this.player.playVideoAt(index);
        },
        mute(): void {
            this.player.mute();
        },
        unMute(): void {
            this.player.unMute();
        },
        isMuted(): boolean {
            return this.player.isMuted();
        },
        setVolume(volume: number): void {
            this.player.setVolume(volume);
        },
        getVolume(): number {
            return this.player.getVolume();
        },
        setSize(width: number, height: number): void {
            this.player.setSize(width, height);
        },
        getPlaybackRate(): number {
            return this.player.getPlaybackRate();
        },
        setPlaybackRate(suggestedRate: number): void {
            this.player.setPlaybackRate(suggestedRate);
        },
        getAvailablePlaybackRates(): number[] {
            return this.player.getAvailablePlaybackRates();
        },
        setLoop(loopPlaylists: boolean): void {
            this.player.setLoop(loopPlaylists);
        },
        setShuffle(shufflePlaylist: boolean): void {
            this.player.setShuffle(shufflePlaylist);
        },
        getVideoLoadedFraction(): number {
            return this.player.getVideoLoadedFraction();
        },
        getPlayerState(): YT.PlayerState {
            return this.player.getPlayerState();
        },
        getCurrentTime(): number {
            return this.player.getCurrentTime();
        },
        getPlaybackQuality(): YT.SuggestedVideoQuality {
            return this.player.getPlaybackQuality();
        },
        setPlaybackQuality(suggestedQuality: YT.SuggestedVideoQuality): void {
            this.player.setPlaybackQuality(suggestedQuality);
        },
        getAvailableQualityLevels(): YT.SuggestedVideoQuality[] {
            return this.player.getAvailableQualityLevels();
        },
        getDuration(): number {
            return this.player.getDuration();
        },
        getVideoUrl(): string {
            return this.player.getVideoUrl();
        },
        getVideoEmbedCode(): string {
            return this.player.getVideoEmbedCode();
        },
        getPlaylist(): string[] {
            return this.player.getPlaylist();
        },
        getPlaylistIndex(): number {
            return this.player.getPlaylistIndex();
        },
        getIframe(): HTMLIFrameElement {
            return this.player.getIframe();
        },
    },
    mounted() {
        const { playerHeight, playerWidth, playerParameters, videoId } = this;

        manager.register((factory, uid) => {
            const host = this.noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
            this.elementId = uid;

            nextTick().then(() => {
                this.player = createPlayer(factory, this.elementId, {
                    width: playerWidth,
                    height: playerHeight,
                    ...playerParameters,
                    videoId,
                    host,
                    events: {
                        onReady: (event: YT.PlayerEvent) => {
                            seekIfAutoplay(event.target, playerParameters);
                            this.$emit('ready', event);
                        },
                        onStateChange: (event: YT.OnStateChangeEvent) => {
                            if (event.data !== -1) {
                                this.$emit(manager.events[event.data], event);
                            }
                        },
                        onError: (event: YT.OnErrorEvent) => {
                            this.$emit('error', event);
                        },
                    },
                });
            });
        });
    },
    unmounted() {
        this.player.destroy();
    },
});

export function createPlayer(factory: any, id: string, options: YT.PlayerOptions): YT.Player {
    return new factory.Player(id, options) as YT.Player;
}

export default player;
