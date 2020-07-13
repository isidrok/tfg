const historyApiFallback = require('connect-history-api-fallback');
const PROJECT = require('@tfg-config/project');

const dev = {
  files: [`${PROJECT.DIST}/**/*`],
  watch: true,
  watchEvents: ['add', 'change'],
  watchOptions: {
    awaitWriteFinish: true,
  },
  server: PROJECT.DIST,
  port: 8080,
  minify: false,
  notify: false,
  open: false,
  middleware: [historyApiFallback()],
};

module.exports = dev;
