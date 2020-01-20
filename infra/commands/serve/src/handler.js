const log = require('npmlog');
const devServer = require('@tfg-utils/dev-server');

module.exports = async function (options) {
    let {profile } = options;
    try {
        devServer.init(profile);
    } catch (err) {
        log.error('SERVE', err);
        process.exitCode = 1; 
    }
};