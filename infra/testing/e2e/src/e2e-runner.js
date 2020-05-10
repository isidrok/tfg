const path = require('path');
const execa = require('execa');
const PROJECT = require('@tfg-config/project');


function getConfig(package) {
    try {
        console.log(path.join(package.location, PROJECT.E2E_CONFIG_FILE))
        const config = require(path.join(package.location, PROJECT.E2E_CONFIG_FILE));
        return config(package);
    } catch (err) {
        throw new Error(`Could not load project ${package.name} config file. ${err}`);
    }
}

async function run(package) {
    const config = getConfig(package);
    const codecept = execa('yarn', [
        'codeceptjs',
        'run',
        '-c',
        path.join(__dirname, 'codecept.conf.js'),
        '-o',
        JSON.stringify(config)
    ], {stdio:'inherit'});
    try {
        await codecept;
    } catch (err) {
        throw err.message;
    }
}


module.exports = { run };