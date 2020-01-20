const bs = require('browser-sync').create();
const profiles = require('./profiles');

function init(profile = 'dev') {
  bs.init(profiles[profile]);
}

module.exports = {
  init,
};