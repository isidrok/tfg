const historyApiFallback = require('connect-history-api-fallback');
const PROJECT = require('@tfg-config/project');

const e2e = {
  watch: false,
  ui: false,
  server: PROJECT.DIST,
  port: 8085,
  minify: false,
  notify: false,
  open: false,
  middleware: [historyApiFallback()],
};

module.exports = e2e;
