const path = require('path');
const {rollup} = require('rollup');
const PROJECT = require('@tfg-config/project');
const rollupConfig = require('@tfg-builder/rollup-config');

const cache = {};

function getConfig(package) {
  try {
    const config = require(path.join(
      package.location,
      PROJECT.BUILD_CONFIG_FILE
    ));
    return config(package);
  } catch (err) {
    throw new Error(`Could not load project ${package.name} config file`);
  }
}

async function buildProject(package) {
  const config = getConfig(package);
  const {inputOptions, outputOptions} = config;
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

async function buildLibs(libs) {
  const config = rollupConfig.libs(libs);
  const {inputOptions, outputOptions} = config;
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

async function buildTests(tests, package) {
  const config = rollupConfig.tests(tests, package);
  const {inputOptions, outputOptions} = config;
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

async function buildProjectWithCache(package) {
  const {name} = package;
  const config = getConfig(package);
  const {inputOptions, outputOptions} = config;
  const bundle = await rollup({...inputOptions, cache: cache[name]});
  cache[name] = bundle.cache;
  await bundle.write(outputOptions);
}

async function buildTestsWithCache(tests) {
  const config = rollupConfig.tests(tests);
  const {inputOptions, outputOptions} = config;
  const bundle = await rollup({...inputOptions, cache: cache.tests});
  cache.tests = bundle.cache;
  await bundle.write(outputOptions);
}

module.exports = {
  buildProject,
  buildLibs,
  buildProjectWithCache,
  buildTests,
  buildTestsWithCache,
};
