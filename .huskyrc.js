module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged',
    'post-checkout': 'yarn build:changed',
    'post-merge': 'yarn build:changed',
  },
};
