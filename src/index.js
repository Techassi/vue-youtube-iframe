import manager from './manager';
import YouTubePlayer from './player';

const plugin = {
    install: (app) => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/player_api';

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            app.component('youtube-iframe', YouTubePlayer);

            window.onYouTubeIframeAPIReady = () => {
                manager.registerFactory(window.YT);
                manager.registerEvents();
                manager.runBacklog();
            };
        }
    },
};

export { YouTubePlayer };
export default plugin;
