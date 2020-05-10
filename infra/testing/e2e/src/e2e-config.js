const path = require('path');
const merge = require('deepmerge');
const repoManager = require('@tfg-utils/repo');
const PROJECT  = require('@tfg-config/project');

function getBaseConfig(package) {
    return {
        tests: path.join(package.location, 'e2e', '**', '*.feat.js'),
        output: `${PROJECT.LOGS}/${repoManager.normalize(package.name)}/e2e`,
    };
}

function codeceptConfig(config, package) {
    return merge(getBaseConfig(package), config);
}

function e2eConfig(config){
    return function(package){
        return codeceptConfig(config, package);
    }
}

module.exports = e2eConfig;