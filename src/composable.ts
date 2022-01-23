/* eslint-disable unicorn/prevent-abbreviations */
import type { PlayerVars } from './types';
import type { MaybeElementRef, MaybeRef } from './utils';

export interface Options {
  height?: number | string;
  width?: number | string;
  playerVars?: PlayerVars;
  cookie?: boolean;
}

export function usePlayer(videoID: MaybeRef<string>, element: MaybeElementRef, options: Options = {}) {
  const {
    playerVars = {},
    cookie = true,
    width = 1280,
    height = 720,
  } = options;

  console.log(width, height, cookie, playerVars);
}