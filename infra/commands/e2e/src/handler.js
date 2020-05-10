const log = require('npmlog');
const {e2eRunner} = require('@tfg-testing/e2e');
const repoManager = require('@tfg-utils/repo');

function exitWithError() {
    process.exit(1);
}

async function testProject(project) {
    log.info('E2E', `Testing ${project}...`);
    const package = repoManager.findPackage(project);
    if (!package) {
        throw new Error(`Project ${project} does not exist`);
    }
    await e2eRunner.run(package);
    log.info('E2E', `Tests for ${project} finished`);
}

module.exports = async function (options) {
    const { project } = options;
    try {
        await testProject(project)
    } catch (err) {
        log.error('E2E', err);
        exitWithError();
    }
};