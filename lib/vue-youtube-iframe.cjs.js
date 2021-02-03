// Copyright (c) 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-youtube-iframe 1.0.3
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

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

/**
 * seekIfAutoplay seeks to the provided timestamp if autoplay is enabled
 * @param player The player instance
 * @param playerVars The player vars
 */
function seekIfAutoplay(player, playerVars) {
    if (playerVars.autoplay != undefined && playerVars.autoplay == YT.AutoPlay.AutoPlay) {
        player.mute();
        if (playerVars.start != undefined && playerVars.start != 0) {
            player.seekTo(playerVars.start, true);
        }
        else {
            player.playVideo();
        }
    }
}

const player = vue.defineComponent({
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
    methods: {
        cueVideoById(videoId, startSeconds, suggestedQuality) {
            this.player.cueVideoById(videoId, startSeconds, suggestedQuality);
        },
        loadVideoById(videoId, startSeconds, suggestedQuality) {
            this.player.loadVideoById(videoId, startSeconds, suggestedQuality);
        },
        cueVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality) {
            this.player.cueVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality);
        },
        loadVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality) {
            this.player.loadVideoByUrl(mediaContentUrl, startSeconds, suggestedQuality);
        },
        cuePlaylist(playlist, index, startSeconds, suggestedQuality) {
            this.player.cuePlaylist(playlist, index, startSeconds, suggestedQuality);
        },
        loadPlaylist(playlist, index, startSeconds, suggestedQuality) {
            this.player.loadPlaylist(playlist, index, startSeconds, suggestedQuality);
        },
        playVideo() {
            this.player.playVideo();
        },
        pauseVideo() {
            this.player.pauseVideo();
        },
        stopVideo() {
            this.player.stopVideo();
        },
        seekTo(seconds, allowSeekAhead) {
            this.player.seekTo(seconds, allowSeekAhead);
        },
        nextVideo() {
            this.player.nextVideo();
        },
        previousVideo() {
            this.player.previousVideo();
        },
        playVideoAt(index) {
            this.player.playVideoAt(index);
        },
        mute() {
            this.player.mute();
        },
        unMute() {
            this.player.unMute();
        },
        isMuted() {
            return this.player.isMuted();
        },
        setVolume(volume) {
            this.player.setVolume(volume);
        },
        getVolume() {
            return this.player.getVolume();
        },
        setSize(width, height) {
            this.player.setSize(width, height);
        },
        getPlaybackRate() {
            return this.player.getPlaybackRate();
        },
        setPlaybackRate(suggestedRate) {
            this.player.setPlaybackRate(suggestedRate);
        },
        getAvailablePlaybackRates() {
            return this.player.getAvailablePlaybackRates();
        },
        setLoop(loopPlaylists) {
            this.player.setLoop(loopPlaylists);
        },
        setShuffle(shufflePlaylist) {
            this.player.setShuffle(shufflePlaylist);
        },
        getVideoLoadedFraction() {
            return this.player.getVideoLoadedFraction();
        },
        getPlayerState() {
            return this.player.getPlayerState();
        },
        getCurrentTime() {
            return this.player.getCurrentTime();
        },
        getPlaybackQuality() {
            return this.player.getPlaybackQuality();
        },
        setPlaybackQuality(suggestedQuality) {
            this.player.setPlaybackQuality(suggestedQuality);
        },
        getAvailableQualityLevels() {
            return this.player.getAvailableQualityLevels();
        },
        getDuration() {
            return this.player.getDuration();
        },
        getVideoUrl() {
            return this.player.getVideoUrl();
        },
        getVideoEmbedCode() {
            return this.player.getVideoEmbedCode();
        },
        getPlaylist() {
            return this.player.getPlaylist();
        },
        getPlaylistIndex() {
            return this.player.getPlaylistIndex();
        },
        getIframe() {
            return this.player.getIframe();
        },
    },
    mounted() {
        const { playerHeight, playerWidth, playerParameters, videoId } = this;
        manager.register((factory, uid) => {
            const host = this.noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
            this.elementId = uid;
            vue.nextTick().then(() => {
                this.player = createPlayer(factory, this.elementId, {
                    width: playerWidth,
                    height: playerHeight,
                    ...playerParameters,
                    videoId,
                    host,
                    events: {
                        onReady: (event) => {
                            seekIfAutoplay(event.target, playerParameters);
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
    unmounted() {
        this.player.destroy();
    },
});
function createPlayer(factory, id, options) {
    return new factory.Player(id, options);
}

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
