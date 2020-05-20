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
};

module.exports = config;
