const path = require('path');
const merge = require('deepmerge');
const repoManager = require('@tfg-utils/repo');
const PROJECT = require('@tfg-config/project');
const getPlugins = require('./plugins');

function getDefaultInputConfig() {
  return {
    cache: null,
  };
}

function getDefaultOutputConfig(package) {
  return {
    dir: `${PROJECT.DIST}/${repoManager.normalize(package.name)}`,
    format: 'system',
    sourcemap: true,
  };
}

function getAbsInput(input, package) {
  return Object.entries(input).reduce((input, [alias, relPath]) => {
    input[alias] = path.resolve(package.location, relPath);
    return input;
  }, {});
}

function getInput(config, package) {
  const {input, plugins, ...inputConfig} = config;
  if (typeof input !== 'object') {
    throw new Error('config.input must be an object');
  }
  return merge(getDefaultInputConfig(), {
    input: getAbsInput(input, package),
    plugins: getPlugins(
      plugins,
      repoManager.normalize(package.name),
      `${PROJECT.DIST}/${repoManager.normalize(package.name)}`,
      Object.keys(package.dependencies || {}),
      repoManager.externalDeps
    ),
    ...inputConfig,
  });
}

function getOutput(output, package) {
  return merge(getDefaultOutputConfig(package), output || {});
}

function projectConfig(config) {
  return function (package) {
    const {output, ...inputConfig} = config;
    return {
      inputOptions: getInput(inputConfig, package),
      outputOptions: getOutput(output, package),
    };
  };
}

module.exports = projectConfig;
