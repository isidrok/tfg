
const path = require('path');
const { rollup } = require('rollup');
const PROJECT  = require('@tfg-config/project');
const rollupConfig = require('@tfg-builder/rollup-config');

const cache = {};

function getConfig(package) {
    try {
        const config = require(path.join(package.location, PROJECT.CONFIG_FILE));
        return config(package);
    } catch (err) {
        throw new Error(`Could not load project ${package.name} config file: ${err.message}`);
    }
}

async function buildProject(package) {
    try {
        const config = getConfig(package);
        const { inputOptions, outputOptions } = config;
        const bundle = await rollup(inputOptions);
        await bundle.write(outputOptions);
    } catch (err) {
        throw new Error(`Error building ${package.name}: ${err.message}`);
    }
}

async function buildLibs(libs){
    try {
        const config = rollupConfig.libsConfig(libs);
        const { inputOptions, outputOptions } = config;
        const bundle = await rollup(inputOptions);
        await bundle.write(outputOptions);
    } catch (err) {
        throw new Error(`Error building ${libs}: ${err.message}`);
    }
}

async function buildProjectWithCache(package){
    const {name} = package;
    try {
        const config = getConfig(package);
        const { inputOptions, outputOptions } = config;
        const bundle = await rollup({ ...inputOptions, cache: cache[name] });
        cache[name] = bundle.cache;
        await bundle.write(outputOptions);
    } catch (err) {
        throw new Error(`Error building ${name}: ${err.message}`);
    }
}

module.exports = {
    buildProject,
    buildLibs,
    buildProjectWithCache
};