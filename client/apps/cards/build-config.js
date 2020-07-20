const {rollupConfig} = require('@tfg-builder/builder');

module.exports = rollupConfig.project({
  input: {
    '@tfg-apps/cards': 'index.js',
    '@tfg-apps/cards/summary': 'src/components/summary.js',
  },
});
