#! /usr/bin/env node

import chalk from 'chalk';
import fs, { read } from 'fs';
import readline from 'readline';

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
    clear:    used to clear completed todos
    help:     used to print the usage guide
  `

  console.log(usageText);
}

function prompt(question) {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, error) => {
    readlineInterface.question(question, answer => {
      readlineInterface.close();
      resolve(answer);
    });
  })
}


async function newTodo(db) {
  const question = chalk.blue('Type in your todo\n')
  const todo = await prompt(question);
  db.push({title: todo, complete: false});
  fs.writeFileSync('todoDB.json', JSON.stringify(db));
  console.log(chalk.green('Saved successfully'));
}

function getTodos(db) {
  db.forEach((todo, idx) => console.log(`${idx+1}. ${todo.title} ${todo.complete ? '✔' : ''}`));
}

function completeTodo(db, n) {
  if (isNaN(n)) {
    errorLog("please provide a valid number for complete command")
    return;
  }

  const idx = n - 1;
 
  if (!db[idx]) {
    errorLog("Cannot find todo with this number")
    return;
  }

  db[idx].complete = true;
  fs.writeFileSync('todoDB.json', JSON.stringify(db));
  console.log(chalk.green('Completed successfully'));
}

function clearCompletedTodos(db) {
  const clearedDB = db.filter(todo => !todo.complete);
  fs.writeFileSync('todoDB.json', JSON.stringify(clearedDB));
  console.log(chalk.green('Cleared successfully'));
}

const commands = ['new', 'get', 'complete', 'clear', 'help'];

// used to log errors to the console in red color
function errorLog(error) {
  const eLog = chalk.red(error)
  console.log(eLog)
}

// we make sure the length of the arguments is exactly three
if (args.length > 3 && args[2] != 'complete') {
  errorLog('only one argument can be accepted');
  printUsage();
  process.exit();
}

if (commands.indexOf(args[2]) == -1) {
  errorLog('invalid command passed');
  printUsage();
  process.exit();
}


// Read database
const todoDB = JSON.parse(fs.readFileSync('todoDB.json'));

const currentCommand = args[2];

switch(currentCommand) {
  case 'help':
    printUsage()
    break
  case 'new':
    newTodo(todoDB);	
    break
  case 'get':
    getTodos(todoDB);	
    break
  case 'complete':
    const todoNumber = Number(args[3]);
    completeTodo(todoDB, todoNumber);
    break
  case 'clear':
    clearCompletedTodos(todoDB);
    break
  default:
    errorLog('invalid command passed');
    printUsage();
}
