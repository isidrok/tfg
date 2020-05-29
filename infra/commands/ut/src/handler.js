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

async function buildProjectTests(package, tests) {
  log.info('UT', `Building ${package.name} tests...`);
  await rollupRunner.buildTests(tests, package);
  log.info('UT', `Build for ${package.name} finished`);
}

async function getProjectInfo(project) {
  const package = repoManager.findPackage(project);
  if (!package) {
    throw new Error(`Project ${project} does not exist`);
  }
  const tests = await findTests(package);
  return {package, tests};
}

async function prepareProject(project) {
  const {package, tests} = await getProjectInfo(project);
  if (!tests.length) {
    return false;
  }
  await buildProjectTests(package, tests);
  return true;
}

async function prepareProjects(projects) {
  const preps = await Promise.all(projects.map(prepareProject));
  return preps.some((prep) => prep);
}

module.exports = async function (options) {
  let {projects, since} = options;
  try {
    if (since) {
      const changedPackages = await repoManager.findChangedPackages(since);
      projects = changedPackages.filter((package) => {
        return repoManager.isClientProject(package);
      });
      if (!projects.length) {
        log.info('UT', `No project changed since ${since}`);
      } else {
        log.info('UT', `Detected project changes since ${since}`);
        log.info('UT', `Running tests for ${projects}`);
      }
    }
    const hasTests = await prepareProjects(projects);
    if (!hasTests) {
      log.info('UT', `No tests were found for ${projects}`);
      return;
    }
    await updateImportMap();
    await utRunner.run();
  } catch (err) {
    log.error('UT', err);
    process.exitCode = 1;
  }
};
