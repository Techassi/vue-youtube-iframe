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
        return h('div', { class: ['vue-youtube-iframe'] }, [h('div', { id: this.elementId })]);
    },
    template: '<div class="vue-youtube-iframe"><div :id="elementId"></div></div>',
    methods: {
        /**
         * cueVideoById queues a video by ID
         * @param videoId YouTube video ID
         * @param startSeconds Time in seconds from which the video should start playing
         * @param suggestedQuality Suggested video player quality
         */
        cueVideoById(videoId: string, startSeconds?: number, suggestedQuality?: YT.SuggestedVideoQuality): void {
            this.player.cueVideoById(videoId, startSeconds, suggestedQuality);
        },

        /**
         * loadVideoById loads a video by ID
         * @param videoId YouTube video ID
         * @param startSeconds Time in seconds from which the video should start playing
         * @param suggestedQuality Suggested video player quality
         */
        loadVideoById(videoId: string, startSeconds?: number, suggestedQuality?: YT.SuggestedVideoQuality): void {
            this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
        },

        /**
         * cueVideoByUrl queues a video by URL
         * @param mediaContentUrl Fully qualified player URL
         * @param startSeconds Time in seconds from which the video should start playing
         * @param suggestedQuality Suggested video player quality
         */
        cueVideoByUrl(
            mediaContentUrl: string,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.cueVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality);
        },

        /**
         * loadVideoByUrl loads a video by URL
         * @param mediaContentUrl Fully qualified player URL
         * @param startSeconds Time in seconds from which the video should start playing
         * @param suggestedQuality Suggested video player quality
         */
        loadVideoByUrl(
            mediaContentUrl: string,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.loadVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality);
        },

        /**
         * cuePlaylist queues one ore more videos by ID
         * @param playlist Video ID(s) to play
         * @param index Start index of the playlist (default 0)
         * @param startSeconds Time in seconds from which the video should start playing
         * @param suggestedQuality Suggested video player quality
         */
        cuePlaylist(
            playlist: string | string[],
            index?: number,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.cuePlaylist(playlist, index, startSeconds, suggestedQuality);
        },

        /**
         * loadPlaylist loads one ore more videos by ID
         * @param playlist Video ID(s) to play
         * @param index Start index of the playlist (default 0)
         * @param startSeconds Time in seconds from which the video should start playing
         * @param suggestedQuality Suggested video player quality
         */
        loadPlaylist(
            playlist: string | string[],
            index?: number,
            startSeconds?: number,
            suggestedQuality?: YT.SuggestedVideoQuality
        ): void {
            this.player.loadPlaylist(playlist, index, startSeconds, suggestedQuality);
        },

        /**
         * playVideo plays the current video
         */
        playVideo(): void {
            this.player.playVideo();
        },

        /**
         * pauseVideo pauses the current video
         */
        pauseVideo(): void {
            this.player.pauseVideo();
        },

        /**
         * stopVideo stops the current video
         */
        stopVideo(): void {
            this.player.stopVideo();
        },

        /**
         * seekTo seeks the current video
         * @param seconds Time in seconds to seek to
         * @param allowSeekAhead Allow seeking ahead
         */
        seekTo(seconds: number, allowSeekAhead: boolean): void {
            this.player.seekTo(seconds, allowSeekAhead);
        },

        /**
         * nextVideo loads and plays the next video in the playlist
         */
        nextVideo(): void {
            this.player.nextVideo();
        },

        /**
         * previousVideo loads and plays the previous video in the playlist
         */
        previousVideo(): void {
            this.player.previousVideo();
        },

        /**
         * playVideoAt plays the video with the specified index in the playlist
         * @param index Index of the video to play
         */
        playVideoAt(index: number): void {
            this.player.playVideoAt(index);
        },

        /**
         * mute mutes the player
         */
        mute(): void {
            this.player.mute();
        },

        /**
         * unMute unmutes the player
         */
        unMute(): void {
            this.player.unMute();
        },
        /**
         * isMuted returns wether the player is muted
         * @returns {boolean}
         */
        isMuted(): boolean {
            return this.player.isMuted();
        },

        /**
         * setVolume sets the volume of the player to the provided integer
         * @param volume Volume as an integer between 0 and 100
         */
        setVolume(volume: number): void {
            this.player.setVolume(volume);
        },

        /**
         * getVolume returns the current volume of the player
         * @returns {number}
         */
        getVolume(): number {
            return this.player.getVolume();
        },

        /**
         * setSize sets the size of the player
         * @param width Width in pixels of the player
         * @param height Height in pixels of the player
         */
        setSize(width: number, height: number): void {
            this.player.setSize(width, height);
        },

        /**
         * getPlaybackRate returns the playback rate of the current video
         * @returns {number}
         */
        getPlaybackRate(): number {
            return this.player.getPlaybackRate();
        },

        /**
         * setPlaybackRate sets the playback rate for the current video
         * @param suggestedRate Suggested playback rate
         */
        setPlaybackRate(suggestedRate: number): void {
            this.player.setPlaybackRate(suggestedRate);
        },

        /**
         * getAvailablePlaybackRates returns the available playback rates of the current video
         * @returns {number[]}
         */
        getAvailablePlaybackRates(): number[] {
            return this.player.getAvailablePlaybackRates();
        },

        /**
         * setLoop sets whether the player should continuously play a playlist
         * @param loopPlaylists Wether to loop playlists
         */
        setLoop(loopPlaylists: boolean): void {
            this.player.setLoop(loopPlaylists);
        },

        /**
         * setShuffle sets wether the player should shuffle videos of a playlist
         * @param shufflePlaylist Wether to shuffle playlist videos
         */
        setShuffle(shufflePlaylist: boolean): void {
            this.player.setShuffle(shufflePlaylist);
        },

        /**
         * getVideoLoadedFraction returns a number between 0 and 1 indicating how much the player has buffered
         * @returns {number}
         */
        getVideoLoadedFraction(): number {
            return this.player.getVideoLoadedFraction();
        },

        /**
         * getPlayerState returns the current player state
         * @returns {YT.PlayerState}
         */
        getPlayerState(): YT.PlayerState {
            return this.player.getPlayerState();
        },

        /**
         * getCurrentTime returns the elapsed time in seconds since the video started playing
         * @returns {number}
         */
        getCurrentTime(): number {
            return this.player.getCurrentTime();
        },

        /**
         * getPlaybackQuality returns the playback quality of the current video
         * @returns {YT.SuggestedVideoQuality}
         */
        getPlaybackQuality(): YT.SuggestedVideoQuality {
            return this.player.getPlaybackQuality();
        },

        /**
         * setPlaybackQuality sets the playback quality for the current video
         * @param suggestedQuality Suggested playback quality for the current video
         */
        setPlaybackQuality(suggestedQuality: YT.SuggestedVideoQuality): void {
            this.player.setPlaybackQuality(suggestedQuality);
        },

        /**
         * getAvailableQualityLevels returns a list of available playback qualities of the current video
         * @returns {YT.SuggestedVideoQuality[]}
         */
        getAvailableQualityLevels(): YT.SuggestedVideoQuality[] {
            return this.player.getAvailableQualityLevels();
        },

        /**
         * getDuration returns the duraction of the current video
         * @returns {number}
         */
        getDuration(): number {
            return this.player.getDuration();
        },

        /**
         * getVideoUrl returns the video URL of the current video
         * @returns {string}
         */
        getVideoUrl(): string {
            return this.player.getVideoUrl();
        },

        /**
         * getVideoEmbedCode returns the embed code for the current video
         * @returns {string}
         */
        getVideoEmbedCode(): string {
            return this.player.getVideoEmbedCode();
        },

        /**
         * getPlaylist returns a list of video IDs currently in the playlist
         * @returns {string[]}
         */
        getPlaylist(): string[] {
            return this.player.getPlaylist();
        },

        /**
         * getPlaylistIndex returns the index of the playlist video which is currently playing
         * @returns {number}
         */
        getPlaylistIndex(): number {
            return this.player.getPlaylistIndex();
        },

        /**
         * getIframe returns the DOM node of the embedded iframe
         * @returns {HTMLIFrameElement}
         */
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
