# vue-youtube-iframe

This plugin makes it easy to integrate the YouTube Iframe API into your Vue app. This plugin is Vue V3 compatible.

## Usage

### Installation

```shell
npm install vue-youtube-iframe --save
```

or

```shell
yarn add vue-youtube-iframe
```

### Basic usage

`main.js`

```js
import { createApp } from 'vue';
import App from './App.vue';

import VueYouTubeIframe from 'vue-youtube-iframe';

createApp(App).use(VueYouTubeIframe).mount('#app');
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
        :player-parameters="YT_PLAYER_PARAMS"
        @EVENT="CALLBACK"
    ></youtube-iframe>
</template>
```

#### Available player parameters

For the available player parameters see [here](https://developers.google.com/youtube/player_parameters#Parameters)

#### Available Events

```
@ready, @error, @ended, @playing, @paused, @buffering and @cued
```

For detailed event information check [here](https://developers.google.com/youtube/iframe_api_reference#Events)

## Contributing / Building

Contributions and pull request are welcome!

```shell
cd vue-youtube-iframe
yarn install / npm install
yarn run build / npm run build
```
