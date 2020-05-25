module.exports = {
  extends: ['plugin:node/recommended'],
  env: {
    node: true,
  },
  rules: {
    'node/exports-style': [2, 'module.exports'],
    'node/no-unpublished-require': 0,
    'node/no-unsupported-features/es-builtins': [
      2,
      {
        version: '~12.16.1',
      },
    ],
    'node/no-unsupported-features/es-syntax': [
      2,
      {
        version: '~12.16.1',
      },
    ],
    'node/no-unsupported-features/node-builtins': [
      2,
      {
        version: '~12.16.1',
      },
    ],
  },
};
