#! /usr/bin/env node

import chalk from 'chalk';
const args = process.argv;


function printUsage() {
  const usageText = `
  todo helps you manage you todo tasks.

  usage:
    todo <command>

    commands can be:

    new:      used to create a new todo
    get:      used to retrieve your todos
    complete: used to mark a todo as complete
    help:     used to print the usage guide
  `

  console.log(usageText);
}

const commands = ['new', 'get', 'complete', 'help'];

// used to log errors to the console in red color
function errorLog(error) {
  const eLog = chalk.red(error)
  console.log(eLog)
}

// we make sure the length of the arguments is exactly three
if (args.length > 3) {
  errorLog(`only one argument can be accepted`);
  printUsage();
}

if (commands.indexOf(args[2]) == -1) {
  errorLog('invalid command passed');
  printUsage();
}


const currentCommand = args[2];

switch(currentCommand) {
  case 'help':
    printUsage()
    break
  case 'new':
    console.log('TODO, handle new');	
    break
  case 'get':
    console.log('TODO, handle get');	
    break
  case 'complete':
    console.log('TODO, handle complete');	
    break
  default:
    errorLog('invalid command passed');
    printUsage();
}
