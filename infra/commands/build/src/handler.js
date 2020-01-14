const log = require('npmlog');
const chokidar = require('chokidar');
const rollupRunner = require('@tfg-builder/rollup-runner');
const insertImportMap = require('@tfg-builder/import-map');
const { getPackage, getDepsToBuild, getClientProjects, getLocations, getProjectByLocation } = require('@tfg-utils/repo');

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
    const package = getPackage(project);
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

async function buildLib(lib) {
    log.info('BUILD', `Building ${lib}...`);
    await rollupRunner.buildLib(lib);
    log.info('BUILD', `Build for ${lib} finished`);
}

async function buildLibs() {
    try {
        const libs = getDepsToBuild();
        log.info('BUILD', `Build for libraries [${libs.join(', ')}] started`);
        await Promise.all(libs.map(buildLib));
        log.info('BUILD', `Finished building all libraries`);
    } catch (err) {
        log.error('BUILD', `Error building libraries: ${err.stack}`);
        throw err;
    }
}

async function buildProjectWithCache(project) {
    log.info('WATCH', `Building ${project}...`);
    const package = getPackage(project);
    if (!package) {
        throw new Error(`Project ${project} does not exist`);
    }
    await rollupRunner.buildProjectWithCache(package);
    log.info('WATCH', `Build for ${project} finished`);
}


async function startWatcher() {
    log.info('WATCH', `Watcher started`);
    const projectSources = getLocations(getClientProjects()).map((location) => `${location}/src/**/*`);
    const watcher = chokidar.watch(projectSources, {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on('add', onChanges)
        .on('change', onChanges)
        .on('unlink', onChanges);
}

async function onChanges(path) {
    const projectLocation = path.substring(0, path.lastIndexOf('/src/'));
    const project = getProjectByLocation(projectLocation);
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
            projects = getClientProjects();
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