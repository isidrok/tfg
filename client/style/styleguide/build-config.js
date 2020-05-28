const {rollupConfig} = require('@tfg-builder/builder');

module.exports = rollupConfig.project({
  input: {
    '@tfg-style/styleguide': 'index.js',
  },
});
