const path = require('path');
const execa = require('execa');

async function run() {
  const karma = execa(
    'yarn',
    ['karma', 'start', path.join(__dirname, 'karma.conf.js')],
    {stdio: 'inherit'}
  );
  try {
    await karma;
  } catch (err) {
    throw err.message;
  }
}

module.exports = {run};
