const yargs = require('yargs');
const commands = require('./commands');

commands.forEach((cmd) => {
  yargs.command(require(cmd));
});

yargs.help().parse();
