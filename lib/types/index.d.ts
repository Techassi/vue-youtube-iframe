import { App } from 'vue';
import YouTubePlayer from './player';
declare const plugin: {
    install: (app: App) => void;
};
export { YouTubePlayer };
export default plugin;
