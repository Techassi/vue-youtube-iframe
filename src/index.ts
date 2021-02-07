import { App, Plugin } from 'vue';

import { manager } from './manager';
import YouTubePlayer from './player';

const install = (app: App): void => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';

        console.log('New TS Version');

        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag.parentNode != null) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            app.component('youtube-iframe', YouTubePlayer);

            (window as any).onYouTubeIframeAPIReady = () => {
                console.log(typeof window.YT);

                manager.registerFactory((window.YT as unknown) as YT.Player);
                manager.registerEvents();
                manager.runBacklog();
            };
        }
    }
};

const plugin: Plugin = {
    install,
};

export { YouTubePlayer };
export default plugin;
