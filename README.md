# vue-youtube-iframe

This plugin makes it easy to integrate the YouTube Iframe API into your Vue app. This plugin is Vue V3 compatible.

## ⚠️ Notice

The new version `1.0.6` (rewritten in Typescript) introduces the following breaking change:

The events `@ended`, `@playing`, `@paused`, `@buffering` and `@cued` will no longer be emitted. Instead you should now
use `@state-change` to catch the events when the player state changes. This better represents the behaviour of the
YouTube Iframe API described [here](https://developers.google.com/youtube/iframe_api_reference#Events).

### New features

-   Support for typings across the board. In detail these are type declarations for the plugin itself as well as YouTube
    Iframe specific typings under the namespace `YT` from `@types/youtube` (See
    [here](https://www.npmjs.com/package/@types/youtube) and
    [here](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/youtube)).
-   API complete methods for pausing, stoping and queueing videos (See
    [here](https://developers.google.com/youtube/iframe_api_reference#Functions))

## 🧪 Upcoming version 1.0.7

Planned features for the upcoming `1.0.7` release are:

- [ ] Video ID reactivity, see [#3](https://github.com/Techassi/vue-youtube-iframe/issues/3)
- [ ] Vue 2 support via `vue-demi` [#4](https://github.com/Techassi/vue-youtube-iframe/issues/4)
- [ ] Add composable functions
- [ ] Maybe remove `types/youtube` dependency by defining own types
- [x] Add support for new events, see [here](https://developers.google.com/youtube/iframe_api_reference#Events)
    -    onPlaybackQualityChange
    -    onPlaybackRateChange
    -    onApiChange
- [x] Switch to Vite toolchain 

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

## Contributing / Building

Contributions and pull request are welcome!

```shell
cd vue-youtube-iframe
yarn install / npm install
yarn run build / npm run build
```
