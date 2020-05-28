module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'post-checkout': 'yarn build:changed',
    'post-merge': 'yarn build:changed',
  },
};
