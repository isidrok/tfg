module.exports = {
  env: {
    browser: true,
    node: false,
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'build-config.js'],
      extends: ['plugin:node/recommended'],
      rules: {
        'node/no-unpublished-require': 0,
      },
      env: {
        browser: false,
        node: true,
      },
    },
    {
      files: ['**/e2e/**/*.js'],
      extends: ['plugin:codeceptjs/recommended'],
    },
    {
      files: ['**/*.spec.js'],
      env: {
        jasmine: true,
      },
    },
  ],
};
