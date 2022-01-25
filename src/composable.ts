/* eslint-disable unicorn/prevent-abbreviations */
import { ref } from 'vue-demi';

import type { MaybeElementRef, MaybeRef } from './utils';
import type {
  PlayerVars,
  PlaybackQualityChangeEvent,
  PlaybackRateChangeEvent,
  PlayerStateChangeEvent,
  APIChangeEvent,
  ErrorEvent,
  PlayerEvent,
} from './types';

export interface Options {
  height?: number | string;
  width?: number | string;
  playerVars?: PlayerVars;
  cookie?: boolean;
}

export type PlaybackQualityChangeCallback = (event: PlaybackQualityChangeEvent) => void;
export type PlaybackRateChangeCallback = (event: PlaybackRateChangeEvent) => void;
export type PlayerStateChangeCallback = (event: PlayerStateChangeEvent) => void;
export type APIChangeCallback = (event: APIChangeEvent) => void;
export type ErrorCallback = (event: ErrorEvent) => void;
export type ReadyCallback = (event: PlayerEvent) => void;

export function usePlayer(videoID: MaybeRef<string>, element: MaybeElementRef, options: Options = {}) {
  // Options
  const {
    playerVars = {},
    cookie = true,
    width = 1280,
    height = 720,
  } = options;

  // Callback refs
  const playbackQualityChangeCallback = ref();
  const playbackRateChangeCallback = ref();
  const playerStateChangeCallback = ref();
  const apiChangeCallback = ref();
  const errorCallback = ref();
  const readyCallback = ref();

  // Functions
  const onPlaybackQualityChange = (fn: PlaybackQualityChangeCallback) => {
    playbackQualityChangeCallback.value = fn;
  };

  const onPlaybackRateChange = (fn: PlaybackRateChangeCallback) => {
    playbackRateChangeCallback.value = fn;
  };

  const onStateChange = (fn: PlayerStateChangeCallback) => {
    playerStateChangeCallback.value = fn;
  };

  const onApiChange = (fn: APIChangeCallback) => {
    apiChangeCallback.value = fn;
  };

  const onError = (fn: ErrorCallback) => {
    errorCallback.value = fn;
  };

  const onReady = (fn: ReadyCallback) => {
    readyCallback.value = fn;
  };

  return {
    onPlaybackQualityChange,
    onPlaybackRateChange,
    onStateChange,
    onApiChange,
    onError,
    onReady,
  };

  console.log(width, height, cookie, playerVars);
}

export type UsePlayerReturn = ReturnType<typeof usePlayer>;