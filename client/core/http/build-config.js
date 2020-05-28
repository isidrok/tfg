const {rollupConfig} = require('@tfg-builder/builder');

module.exports = rollupConfig.project({
  input: {
    '@tfg-core/http': 'index.js',
  },
});
