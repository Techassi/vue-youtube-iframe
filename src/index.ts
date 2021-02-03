import { App } from 'vue';

import { manager } from './manager';
import YouTubePlayer from './player';

const plugin = {
    install: (app: App) => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/player_api';

            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag.parentNode != null) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                app.component('youtube-iframe', YouTubePlayer);

                (window as any).onYouTubeIframeAPIReady = () => {
                    manager.registerFactory((window.YT as unknown) as YT.Player);
                    manager.registerEvents();
                    manager.runBacklog();
                };
            }
        }
    },
};

export { YouTubePlayer };
export default plugin;