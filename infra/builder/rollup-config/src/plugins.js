const merge = require('deepmerge');
const PROJECT  = require('@tfg-config/project');

const plugins = {
    del: require('rollup-plugin-delete'),
    deps: require('@tfg-builder/rollup-plugin-ensure-deps'),
    resolve: require('@rollup/plugin-node-resolve'),
    replace: require('@rollup/plugin-replace'),
    url: require('@rollup/plugin-url'),
    cjs: require('@rollup/plugin-commonjs'),
    babel: require('rollup-plugin-babel'),
    terser: require('rollup-plugin-terser').terser,
    cssModules: require('@tfg-builder/rollup-plugin-css-modules'),
    importMap: require('@tfg-builder/rollup-plugin-import-map'),
    entry: require('@tfg-builder/rollup-plugin-entry'),
};

function getDefaultPluginConfig(name, dir, dependencies, externals) {
    return {
        del: {
            targets: `${dir}/*`
        },
        deps: {
            dependencies,
            externals
        },
        replace: null,
        cssModules: {},
        resolve: {
            preferBuiltins: false
        },
        url: {
            publicPath: `/${name}/`,
            fileName: '[name].[hash][extname]',
        },
        cjs: {},
        babel: {},
        terser: null,
        //terser: {
          //  output: {
            //    comments: false
            //}
        //},
        importMap: {
            mapFileName: PROJECT.IMPORT_MAP_FILENAME,
            baseURL: `/${name}/`
        },
        entry: null,
    }
}

function getPlugins(projectPlugins, name, dir, dependencies, externals) {
    const pluginConfig = merge(
        getDefaultPluginConfig(name, dir, dependencies, externals),
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