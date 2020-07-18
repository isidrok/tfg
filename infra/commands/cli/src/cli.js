const yargs = require('yargs');
const commands = require('./commands');

commands.forEach((cmd) => {
  yargs.command(require(cmd));
});

yargs.scriptName('tfg').help().parse();
