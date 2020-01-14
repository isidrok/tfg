const path = require('path');
const merge = require('deepmerge');
const { removeScope,  getExternalDeps } = require('@tfg-utils/repo');
const PROJECT  = require('@tfg-config/project');
const getPlugins = require('./plugins');

function getDefaultInputConfig() {
    return {
        cache: null,
        external: getExternalDeps()
    };
};

function getDefaultOutputConfig(package) {
    return {
        dir: `${PROJECT.DIST}/${removeScope(package.name)}`,
        format: 'system',
        sourcemap: true,
    }
}

function getAbsInput(input, package) {
    return Object.entries(input).reduce((input, [alias, relPath]) => {
        input[alias] = path.resolve(package.location, relPath);
        return input;
    }, {});
}

function getInput(config, package) {
    const { output, plugins, input, ...inputConfig } = config;
    if (typeof input !== 'object') {
        throw new Error('config.input must be an object');
    }
    return merge(getDefaultInputConfig(), {
        input: getAbsInput(input, package),
        plugins: getPlugins(config.plugins, removeScope(package.name)),
        ...inputConfig
    });
}

function getOutput(config, package){
    return merge(getDefaultOutputConfig(package), config.output || {});
}

function projectConfig(config){
    return function(package){
        return {
            inputOptions: getInput(config, package),
            outputOptions: getOutput(config, package)
        };
    }
}

module.exports = projectConfig;