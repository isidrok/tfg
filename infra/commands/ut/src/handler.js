const path = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const log = require('npmlog');
const {rollupRunner, importMap} = require('@tfg-builder/builder');
const repoManager = require('@tfg-utils/repo');
const PROJECT = require('@tfg-config/project');
const {utRunner} = require('@tfg-testing/ut');

async function updateImportMap() {
  try {
    log.info('UT', `Generating import map...`);
    await importMap.insert({
      from: PROJECT.TEMPLATE_UT,
      to: PROJECT.INDEX_UT,
    });
    log.info('UT', `Import map generated`);
  } catch (err) {
    log.error('UT', `Error generating import map: ${err.stack}`);
    process.exitCode = 1;
  }
}

async function findTests(package) {
  return glob(path.join(package.location, '**', '*.spec.js'));
}

async function buildProject(package, tests) {
  log.info('UT', `Building ${package.name} tests...`);
  await rollupRunner.buildTests(tests, package);
  log.info('UT', `Build for ${package.name} finished`);
}

module.exports = async function (options) {
  let {project} = options;
  try {
    const package = repoManager.findPackage(project);
    if (!package) {
      throw new Error(`Project ${project} does not exist`);
    }
    const tests = await findTests(package);
    if (!tests.length) {
      log.info('UT', `No tests were found for ${package.name}`);
      return;
    }
    await buildProject(package, tests);
    await updateImportMap();
    await utRunner.run();
  } catch (err) {
    log.error('UT', err);
    process.exitCode = 1;
  }
};
