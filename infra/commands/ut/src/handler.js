const path = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const log = require('npmlog');
const chokidar = require('chokidar');
const rollupRunner = require('@tfg-builder/rollup-runner');
const insertImportMap = require('@tfg-builder/import-map');
const repoManager = require('@tfg-utils/repo');
const PROJECT = require('@tfg-config/project');

function exitWithError() {
    process.exit(1);
}

// async function updateImportMap() {
//     try {
//         log.info('BUILD', `Generating import map...`);
//         await insertImportMap();
//         log.info('BUILD', `Import map generated`);
//     } catch (err) {
//         log.error('BUILD', `Error generating import map: ${err.stack}`);
//         exitWithError();
//     }
// }

async function buildProject(project) {
    log.info('UT', `Building ${project} tests...`);
    const package = repoManager.findPackage(project);
    if (!package) {
        throw new Error(`Project ${project} does not exist`);
    }
    const tests = await glob(path.join(package.location,'**','*.spec.js'));
    await rollupRunner.buildTests(tests, package);
    log.info('UT', `Build for ${project} finished`);
}

// async function buildProjectWithCache(project) {
//     log.info('WATCH', `Building ${project}...`);
//     const package = repoManager.findPackage(project);
//     if (!package) {
//         throw new Error(`Project ${project} does not exist`);
//     }
//     await rollupRunner.buildProjectWithCache(package);
//     log.info('WATCH', `Build for ${project} finished`);
// }

// function startWatcher() {
//     log.info('WATCH', `Watcher started`);
//     const projectSources = repoManager.clientLocations.map((location) => `${location}/src/**/*`);
//     const watcher = chokidar.watch([...projectSources, PROJECT.LOCK_FILE], {
//         ignoreInitial: true,
//         awaitWriteFinish: true,
//     });
//     watcher.on('add', onChanges)
//         .on('change', onChanges)
//         .on('unlink', onChanges);
// }

// function onChanges(path) {
//     if (path === PROJECT.LOCK_FILE) {
//         onLockFileChanges();
//     } else {
//         onProjectChanges(path);
//     }
// }

// async function onProjectChanges(changePath) {
//     const projectLocation = changePath.substring(
//         0,
//         changePath.lastIndexOf(path.normalize('/src/'))
//     );
//     const project = repoManager.findProjectByLocation(projectLocation);
//     log.info('UT', `Detected changes on ${project}`);
//     try {
//         await buildProjectWithCache(project);
//         await updateImportMap();
//     } catch (err) {
//         log.error('UT', err.stack);
//     }
// }

module.exports = async function (options) {
    let { project, watch } = options;
    try {
        await buildProject(project)
        // if (watch) {
            // startWatcher();
        // }
    } catch (err) {
        log.error('UT', err);
        exitWithError();
    }
};