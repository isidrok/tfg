const path = require('path');
const PROJECT = require('@tfg-config/project');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      require.resolve('systemjs/dist/system'),
      { pattern: path.join(PROJECT.DIST, '**', '*'), included: false }
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    customContextFile: PROJECT.INDEX_UT,
    urlRoot: '/__karma__/',
    proxies: {
      '/': '/absolute' + PROJECT.DIST + '/'
    }
  })
}
