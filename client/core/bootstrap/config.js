const {resolve} = require('path');
const { projectConfig } = require('@tfg-builder/rollup-config');
const PROJECT  = require('@tfg-config/project');

module.exports = projectConfig({
    input: {
        'bootstrap': 'index.js'
    },
    output: {
        format: 'iife',
        name: 'tfg',
        dir: resolve(PROJECT.DIST, 'core', 'bootstrap'),
        entryFileNames: '[name].[hash].js'
    },
    plugins: {
        entry: {
            input: resolve(__dirname, 'public', 'index.html'),
            dest: PROJECT.TEMPLATE_HTML,
            basePath: PROJECT.DIST,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: false,
                keepClosingSlash: true,
                minifyURLs: true,
            },
        },
        importMap: null
    }
});