import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');
const now = new Date();

const banner = `// Copyright (c) 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-youtube-iframe ${version} build ${now.getUTCDate()}/${now.getUTCMonth()}/${now.getUTCFullYear()}`;

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/vue-youtube-iframe.esm.js',
            banner,
            format: 'esm',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
        {
            file: './lib/vue-youtube-iframe.umd.js',
            name: 'VueYoutubeIframe',
            banner,
            format: 'umd',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
        {
            file: './lib/vue-youtube-iframe.cjs.js',
            banner,
            format: 'cjs',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
        {
            file: './lib/vue-youtube-iframe.global.js',
            name: 'VueYoutubeIframe',
            banner,
            format: 'iife',
            exports: 'named',
            globals: {
                vue: 'vue',
            },
        },
    ],
    external: ['vue'],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
};
