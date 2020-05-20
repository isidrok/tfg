module.exports = {
  env: {
    browser: true,
    node: false,
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'build-config.js'],
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
