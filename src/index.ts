import { App, Plugin } from 'vue';

import PlayerComponent from './component';
import manager from './manager';

const plugin: Plugin = {
    install(app: App): void {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';

        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag.parentNode != null) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            app.component('youtube-iframe', PlayerComponent);

            (window as any).onYouTubeIframeAPIReady = () => {
                manager.registerFactory((window.YT as unknown) as YT.Player);
                manager.runQueue();
            };
        }
    },
};

export { PlayerComponent as YouTubePlayer };
export default plugin;
