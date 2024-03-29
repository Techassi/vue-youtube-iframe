import type { App, Plugin } from 'vue';

import Player from './player';
import manager from './manager';

const plugin: Plugin = {
  install(app: App): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';

    const firstScriptTag = document.querySelectorAll('script')[0];
    if (firstScriptTag.parentNode !== undefined && firstScriptTag.parentNode !== null) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      app.component('YoutubeIframe', Player);

      (window as any).onYouTubeIframeAPIReady = () => {
        manager.registerFactory((window.YT as unknown) as YT.Player);
        manager.runQueue();
      };
    }
  },
};


export default plugin;

export { default as Player } from './player';