exports.config = {
  tests: './*_test.js',
  output: 'logs',
  helpers: {
    WebDriver: {
      url: 'http://localhost:8085',
      browser: 'chrome'
    }
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  }
}