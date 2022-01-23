/* eslint-disable unicorn/prevent-abbreviations */
/**
 * @see https://developers.google.com/youtube/iframe_api_reference#onStateChange
 */
export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  VIDEO_CUED = 5
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#onError
 */
export enum Error {
  INVALID_PARAMETER = 2,
  HTML5_ERROR = 5,
  NOT_FOUND = 100,
  NOT_ALLOWED = 101,
  NOT_ALLOWED_DISGUISE = 150
}

/**
 * @see https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange
 */
export type VideoQuality = (
  VideoQualityDefault |
  VideoQualitySmall |
  VideoQualityMedium |
  VideoQualityLarge |
  VideoQualityHD720 |
  VideoQualityHD1080 |
  VideoQualityHighres
);

/**
 * Default video quality YouTube chooses.
 */
export type VideoQualityDefault = 'default';

/**
 * The video dimensions are at least 320px by 240px with a 4:3 aspect ratio.
 */
export type VideoQualitySmall = 'small';

/**
 * The video dimensions are at least 640px by 360px (16:9) or 480px by 360px (4:3).
 */
export type VideoQualityMedium = 'medium';

/**
 * The video dimensions are at least 853px by 480px (16:9) or 640px by 480px (4:3).
 */
export type VideoQualityLarge = 'large';

/**
 * The video dimensions are at least 1280px by 720px (16:9) or 960px by 720px (4:3).
 */
export type VideoQualityHD720 = 'hd720';

/**
 * The video dimensions are at least 1920px by 1080px (16:9) or 1440px by 1080px (4:3).
 */
export type VideoQualityHD1080 = 'hd1080';

/**
 * The video height is bigger than 1080px.
 */
export type VideoQualityHighres = 'highres';

export interface PlayerVars {
  test: number;
  bar: boolean;
}