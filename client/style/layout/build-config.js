const {projectConfig} = require('@tfg-builder/rollup-config');

module.exports = projectConfig({
  input: {
    '@tfg-style/layout': 'index.js',
  },
});
