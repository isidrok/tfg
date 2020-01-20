const merge = require('deepmerge');
const PROJECT  = require('@tfg-config/project');

const plugins = {
    resolve: require('@rollup/plugin-node-resolve'),
    replace: require('@rollup/plugin-replace'),
    url: require('@rollup/plugin-url'),
    cjs: require('@rollup/plugin-commonjs'),
    babel: require('rollup-plugin-babel'),
    terser: require('rollup-plugin-terser').terser,
    importMap: require('@tfg-builder/rollup-plugin-import-map'),
    entry: require('@tfg-builder/rollup-plugin-entry')
};

function getDefaultPluginConfig(name) {
    return {
        replace: null,
        resolve: {},
        url: {
            publicPath: `${name}/`,
            fileName: '[name].[hash][extname]',
        },
        cjs: {},
        babel: {},
        terser: {
            output: {
                comments: false
            }
        },
        importMap: {
            mapFileName: PROJECT.IMPORT_MAP_FILENAME,
            baseURL: `/${name}/`
        },
        entry: null
    }
}

function getPlugins(projectPlugins, name) {
    const pluginConfig = merge(
        getDefaultPluginConfig(name),
        projectPlugins || {}
    );
    return Object.entries(pluginConfig).map(function ([plugin, pluginOptions]) {
        if (pluginOptions === null) {
            return;
        }
        return plugins[plugin](pluginOptions);
    }).filter(Boolean);
}

module.exports = getPlugins;