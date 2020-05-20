const path = require('path');
const execa = require('execa');
const e2eConfig = require('./e2e-config');

async function run(package) {
  const config = e2eConfig(package);
  const codecept = execa(
    'yarn',
    [
      'codeceptjs',
      'run',
      '-c',
      path.join(__dirname, 'codecept.conf.js'),
      '-o',
      JSON.stringify(config),
    ],
    {stdio: 'inherit'}
  );
  try {
    await codecept;
  } catch (err) {
    throw err.message;
  }
}

module.exports = {run};
