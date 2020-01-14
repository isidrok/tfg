const { getExternalDeps } = require('@tfg-utils/repo');
const PROJECT = require('@tfg-config/project');
const getPlugins = require('./plugins');

function libConfig(lib) {
    return {
        inputOptions: {
            input: {
                [lib]: require.resolve(lib)
            },
            external: getExternalDeps(),
            plugins: getPlugins({
                replace: null,
                resolve: {},
                url: {
                    publicPath: `${lib}/`,
                    fileName: '[name].[hash][extname]',
                },
                cjs: {},
                babel: {},
                terser: {},
                importMap: {
                    mapFileName: PROJECT.IMPORT_MAP_FILENAME,
                    baseURL: `/libs/${lib}/`
                },
                entry: null
            }),
        },
        outputOptions: {
            dir: `${PROJECT.DIST}/libs/${lib}`,
            format: 'system',
            sourcemap: true,
        }
    };
}

module.exports = libConfig;