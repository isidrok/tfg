const {rollupConfig} = require('@tfg-builder/builder');

module.exports = rollupConfig.project({
  input: {
    '@tfg-core/format': 'index.js',
    '@tfg-core/format/mask': 'src/mask.js',
  },
});
