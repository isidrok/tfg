const {projectConfig} = require('@tfg-builder/rollup-config');

module.exports = projectConfig({
  input: {
    '@tfg-apps/cards': 'index.js',
  },
});
