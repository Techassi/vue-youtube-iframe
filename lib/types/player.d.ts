/// <reference types="youtube" />
declare const player: import("vue").DefineComponent<{
    playerWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    playerHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    playerParameters: {
        type: ObjectConstructor;
        default: () => {
            autoplay: number;
            time: number;
            mute: number;
        };
    };
    videoId: {
        type: StringConstructor;
        default: string;
    };
    noCookie: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    elementId: string;
    player: YT.Player;
}, {}, {
    cueVideoById(videoId: string, startSeconds?: number | undefined, suggestedQuality?: "default" | "small" | "medium" | "large" | "hd720" | "hd1080" | "highres" | undefined): void;
    loadVideoById(videoId: string, startSeconds?: number | undefined, suggestedQuality?: "default" | "small" | "medium" | "large" | "hd720" | "hd1080" | "highres" | undefined): void;
    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number | undefined, suggestedQuality?: "default" | "small" | "medium" | "large" | "hd720" | "hd1080" | "highres" | undefined): void;
    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number | undefined, suggestedQuality?: "default" | "small" | "medium" | "large" | "hd720" | "hd1080" | "highres" | undefined): void;
    cuePlaylist(playlist: string | string[], index?: number | undefined, startSeconds?: number | undefined, suggestedQuality?: "default" | "small" | "medium" | "large" | "hd720" | "hd1080" | "highres" | undefined): void;
    loadPlaylist(playlist: string | string[], index?: number | undefined, startSeconds?: number | undefined, suggestedQuality?: "default" | "small" | "medium" | "large" | "hd720" | "hd1080" | "highres" | undefined): void;
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    nextVideo(): void;
    previousVideo(): void;
    playVideoAt(index: number): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;
    setSize(width: number, height: number): void;
    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): number[];
    setLoop(loopPlaylists: boolean): void;
    setShuffle(shufflePlaylist: boolean): void;
    getVideoLoadedFraction(): number;
    getPlayerState(): YT.PlayerState;
    getCurrentTime(): number;
    getPlaybackQuality(): YT.SuggestedVideoQuality;
    setPlaybackQuality(suggestedQuality: YT.SuggestedVideoQuality): void;
    getAvailableQualityLevels(): YT.SuggestedVideoQuality[];
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    getPlaylist(): string[];
    getPlaylistIndex(): number;
    getIframe(): HTMLIFrameElement;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    playerWidth: string | number;
    playerHeight: string | number;
    playerParameters: Record<string, any>;
    videoId: string;
    noCookie: boolean;
} & {}>, {
    playerWidth: string | number;
    playerHeight: string | number;
    playerParameters: Record<string, any>;
    videoId: string;
    noCookie: boolean;
}>;
export declare function createPlayer(factory: any, id: string, options: YT.PlayerOptions): YT.Player;
export default player;
