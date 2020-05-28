const path = require('path');

const config = {
  helpers: {
    WebDriver: {
      url: 'http://localhost:8085',
      browser: 'chrome',
    },
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    wdio: {
      enabled: true,
      services: ['selenium-standalone'],
    },
  },
  include: {
    I: path.resolve(__dirname, 'steps.js'),
  },
  bootstrap: false,
  mocha: {},
};

module.exports = {config};
