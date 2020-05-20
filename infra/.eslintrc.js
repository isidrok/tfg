module.exports = {
  extends: ['plugin:node/recommended'],
  env: {
    node: true,
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
  },
};
