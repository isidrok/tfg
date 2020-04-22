const PROJECT = require('@tfg-config/project');
const getPlugins = require('./plugins');

function createInput(libs){
    const input = {};
    for(let lib of libs){
        input[lib] = require.resolve(lib);
    }
    return input;
}

function libsConfig(libs) {
    return {
        inputOptions: {
            input: createInput(libs),
            plugins: getPlugins({
                replace: null,
                deps: null,
                resolve: {},
                url: {
                    publicPath: `libs/`,
                    fileName: '[name].[hash][extname]',
                },
                cjs: {},
                babel: {},
                terser: {},
                importMap: {
                    mapFileName: PROJECT.IMPORT_MAP_FILENAME,
                    baseURL: `/libs/`
                },
                entry: null
            }, 'libs', `${PROJECT.DIST}/libs`),
        },
        outputOptions: {
            dir: `${PROJECT.DIST}/libs`,
            format: 'system',
            sourcemap: true,
        }
    };
}

module.exports = libsConfig;