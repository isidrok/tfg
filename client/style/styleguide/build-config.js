const {projectConfig} = require('@tfg-builder/rollup-config');

module.exports = projectConfig({
  input: {
    '@tfg-style/styleguide': 'index.js',
  },
});
