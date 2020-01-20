const log = require('npmlog');
const chokidar = require('chokidar');
const rollupRunner = require('@tfg-builder/rollup-runner');
const insertImportMap = require('@tfg-builder/import-map');
const repoManager = require('@tfg-utils/repo');
const PROJECT = require('@tfg-config/project');

async function updateImportMap() {
    try {
        log.info('BUILD', `Generating import map...`);
        await insertImportMap();
        log.info('BUILD', `Import map generated`);
    } catch (err) {
        log.error('BUILD', `Error generating import map: ${err.stack}`);
        throw err;
    }
}

async function buildProject(project) {
    log.info('BUILD', `Building ${project}...`);
    const package = repoManager.findPackage(project);
    if (!package) {
        throw new Error(`Project ${project} does not exist`);
    }
    await rollupRunner.buildProject(package);
    log.info('BUILD', `Build for ${project} finished`);
}

async function buildProjects(projects) {
    try {
        log.info('BUILD', `Build for [${projects.join(', ')}] started`);
        await Promise.all(projects.map(buildProject));
        log.info('BUILD', `Finished building all projects`);
    } catch (err) {
        log.error('BUILD', `Error building projects: ${err.stack}`);
        throw err;
    }
}

async function buildLibs() {
    try {
        const libs = repoManager.libs;
        log.info('BUILD', `Build for libraries [${libs.join(', ')}] started`);
        await rollupRunner.buildLibs(libs);
        log.info('BUILD', `Finished building all libraries`);
    } catch (err) {
        log.error('BUILD', `Error building libraries: ${err.stack}`);
        throw err;
    }
}

async function buildProjectWithCache(project) {
    log.info('WATCH', `Building ${project}...`);
    const package = repoManager.findPackage(project);
    if (!package) {
        throw new Error(`Project ${project} does not exist`);
    }
    await rollupRunner.buildProjectWithCache(package);
    log.info('WATCH', `Build for ${project} finished`);
}

function startWatcher(){
    log.info('WATCH', `Watcher started`);
    const projectSources = repoManager.clientLocations.map((location) => `${location}/src/**/*`);
    const watcher = chokidar.watch([...projectSources, PROJECT.LOCK_FILE], {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on('add', onChanges)
        .on('change', onChanges)
        .on('unlink', onChanges);
}

function onChanges(path){
    if(path === PROJECT.LOCK_FILE){
        onLockFileChanges();
    } else {
        onProjectChanges(path);
    }
}

async function onLockFileChanges(){
    log.info('WATCH', `Lockfile changed`);
    await buildLibs();
    await updateImportMap();
}

async function onProjectChanges(path) {
    const projectLocation = path.substring(0, path.lastIndexOf('/src/'));
    const project = repoManager.findProjectByLocation(projectLocation);
    log.info('WATCH', `Detected changes on ${project}`);
    try {
        await buildProjectWithCache(project);
        await updateImportMap();
    } catch (err) {
        log.error('WATCH', err.stack);
    }
}

module.exports = async function (options) {
    let { projects, libs, all, watch } = options;
    try {
        if (all) {
            log.info('BUILD', `Building all projects and libraries`);
            projects = repoManager.clientProjects;
            libs = true;
        }
        if (projects && projects.length) {
            await buildProjects(projects)
        }
        if (libs) {
            await buildLibs();
        }
        if (all || libs || projects && projects.length) {
            await updateImportMap();
        }
        if (watch) {
            startWatcher();
        }
    } catch (err) {
        log.error('BUILD', err);
        process.exitCode = 1; 
    }
};