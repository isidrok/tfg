const {projectConfig} = require('@tfg-builder/rollup-config');

module.exports = projectConfig({
    input: {
        '@tfg-core/css': 'index.js'
    }
});