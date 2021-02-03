import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');

const banner = `// Copyright (c) 2020-present Techassi
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.
// vue-youtube-iframe ${version}`;

export default {
    input: './src/index.ts',
    output: [
        {
            file: './lib/vue-youtube-iframe.esm.js',
            banner,
            format: 'esm',
            exports: 'named',
        },
        {
            file: './lib/vue-youtube-iframe.umd.js',
            name: 'VueYouTubeEmbed',
            banner,
            format: 'umd',
            exports: 'named',
        },
        {
            file: './lib/vue-youtube-iframe.cjs.js',
            banner,
            format: 'cjs',
            exports: 'named',
        },
        {
            file: './lib/vue-youtube-iframe.global.js',
            banner,
            format: 'iife',
            exports: 'named',
        },
    ],
    external: ['vue'],
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
};
