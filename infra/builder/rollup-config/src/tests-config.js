const PROJECT = require('@tfg-config/project');
const repoManager = require('@tfg-utils/repo');
const getPlugins = require('./plugins');

function testsConfig(tests, package) {
    return {
        inputOptions: {
            input: tests,
            plugins: getPlugins({
                replace: {},
                deps: {},
                resolve: {},
                url: {
                    publicPath: `tests/`,
                    fileName: '[name].[hash][extname]',
                },
                cjs: {},
                babel: {},
                terser: null,
                importMap: null,
                entry: null
            }, 'tests', `${PROJECT.DIST}/tests/`, Object.keys(package.dependencies || {}), repoManager.externalDeps),
        },
        outputOptions: {
            dir: `${PROJECT.DIST}/tests/`,
            format: 'system',
            sourcemap: true,
        }
    };
}

module.exports = testsConfig;