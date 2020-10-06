// import buble from '@rollup/plugin-buble';

const { version } = require('./package.json');

const banner = `// Copyright © ${new Date().getFullYear()}-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-youtube-iframe ${version}`;

export default {
    input: './src/index.js',
    output: [
        {
            file: './lib/vue-youtube-iframe.esm.js',
            banner,
            format: 'esm',
            globals: {
                vue: 'Vue',
            },
        },
        {
            file: './lib/vue-youtube-iframe.umd.js',
            name: 'VueYouTubeEmbed',
            banner,
            format: 'umd',
            exports: 'named',
            globals: {
                vue: 'Vue',
            },
        },
    ],
    // plugins: [buble()],
};
