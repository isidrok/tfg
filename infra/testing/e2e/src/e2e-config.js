const path = require('path');
const repoManager = require('@tfg-utils/repo');
const PROJECT = require('@tfg-config/project');

function e2eConfig(package) {
  return {
    tests: path.join(package.location, 'e2e', '**', '*.feat.js'),
    output: `${PROJECT.LOGS}/${repoManager.normalize(package.name)}/e2e`,
  };
}

module.exports = e2eConfig;
