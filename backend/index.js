const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { initRepo } = require('./controllers/init');
const { add } = require('./controllers/add');
yargs(hideBin(process.argv))
  .command( "init", "Initialize the repository",{},initRepo)
   .command( "add <file>", "Add a file to the repository",(yargs)=>
    {yargs.positional('file', {
      describe: 'The file to add',
      type: 'string'
    })},add)
   
    .demandCommand(1, "You need to specify a command")
.help().argv;
    