# ⚠️ Notice

This plugin is deprecated. Please use the new and improved [@vue-youtube/core](https://github.com/vue-youtube/vue-youtube) plugin.

# vue-youtube-iframe

This plugin makes it easy to integrate the YouTube Iframe API into your Vue app. This plugin is Vue V3 compatible.

## Usage

### Installation

```shell
npm install @techassi/vue-youtube-iframe --save
```

or

```shell
yarn add @techassi/vue-youtube-iframe
```

### Basic usage

`main.js` / `main.ts`

```js
import { createApp } from 'vue';
import App from './App.vue';

import YoutubeIframe from '@techassi/vue-youtube-iframe';

createApp(App).use(YoutubeIframe).mount('#app');
```

`YourComponent.vue`

```vue
<template>
    <youtube-iframe :video-id="YT_VIDEO_ID"></youtube-iframe>
</template>
```

### Advanced usage

`YourComponent.vue`

```vue
<template>
    <youtube-iframe
        :video-id="YT_VIDEO_ID"
        :player-width="WIDTH"
        :player-height="HEIGHT"
        :no-cookie="TRUE / FALSE"
        :player-parameters="YT_PLAYER_PARAMS"
        @EVENT="CALLBACK"
    ></youtube-iframe>
</template>
```

### Typings

Vue currently doesn't support typings when using a component in a SFC and accessing it via `ref` / `this.$refs`. There
is a way to bring in typings when using `ref`. Please note: This isn't the most elegant solution.

```vue
<template>
    <youtube-iframe :video-id="YT_VIDEO_ID" ref="yt"></youtube-iframe>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Player } from '@techassi/vue-youtube-iframe';

export default defineComponent({
    name: 'App',
    mounted() {
        const player = this.$refs.yt as typeof Player;
        // Variable player now has typings
    },
});
</script>
```

### Available props

-   `:videoId / :video-id`: Specify the YT video id (e.g. `dQw4w9WgXcQ`)
-   `:playerWidth / :player-width`: Specify the player's width in pixels
-   `:playerHeight / :player-height`: Specify the player's height in pixels
-   `:noCookie / :no-cookie`: If set to `true` the host will be set to `https://www.youtube-nocookie.com`
-   `:playerParameters / :player-parameters`: Set player parameters, see [here](#available-player-parameters)

### Available player parameters

For the available player parameters see [here](https://developers.google.com/youtube/player_parameters#Parameters)

### Available Events

```
@ready, @error, @state-change
```

For detailed event information check [here](https://developers.google.com/youtube/iframe_api_reference#Events)
