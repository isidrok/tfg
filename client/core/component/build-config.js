const {projectConfig} = require('@tfg-builder/rollup-config');

module.exports = projectConfig({
    input: {
        '@tfg-core/component': 'index.js'
    }
});