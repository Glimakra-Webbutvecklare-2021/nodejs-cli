import chalk from "chalk";
import fs from "fs";
import readline from 'readline';

// Is responsible to show user how to use the application
// MVC type is: VIEW
function printUsage() {
    console.log(`
    Welcome to Todo app

    Usage:

    new:        used to create new todo
    get:        used to get all todos
    complete <number>: used set todo to complete
    clear:      used to remove completed todos
    help:       used to display instructions
    `);
}

// MVC type is: VIEW
function getTodos(todos) {
    todos.forEach((todo, idx) => 
                console.log(`${idx+1}. ${todo.title} ${todo.completed ? '[x]' : '[ ]'}`));
}


function createTodo(todos) {
    // Ask user what the new todo is called
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
    // MVC type is: VIEW 
    rl.question("Type your new todo: ", function(todoTitle) {
        // Add new todo to DB
        // step 1 push new todo to db
        todos.push({title: todoTitle, completed: false});
        // step 2 update db file with new state
        // MVC type is: MODEL 
        fs.writeFileSync("./todo-live-db.json", JSON.stringify(todos));
        console.log(chalk.green("Todo saved"));
        rl.close();
    });
  
}

function completeTodo(todos, todoNumber) {
    const num = Number(todoNumber);
    // SANTIY CHECK 
    // MVC type is: CONTROLLER 
    if (num < 0 || num > todos.length) {
        console.log(chalk.red("Invalid todo number"));
        process.exit(1);
    }

    // Ajust specified todo to be completed
    // step 1 adjust specfied todo to be completed
    const idx = num - 1;
    todos[idx].completed = true;
    // step 2 update db file with new state
    // MVC type is: MODEL
    fs.writeFileSync("./todo-live-db.json", JSON.stringify(todos));

    // MVC type is: VIEW
    console.log(chalk.green(`'${todos[idx].title}' has been completed`));
}

function clearCompletedTodo(todos) {
    const completedTodos = todos.filter(todo => todo.completed); 
    const uncompletedTodos = todos.filter(todo => !todo.completed); 

    // MVC type is: MODEL
    fs.writeFileSync("./todo-live-db.json", JSON.stringify(uncompletedTodos));

    // MVC type is: CONTROLLER
    if (completedTodos.length > 0) {
        // MVC type is: VIEW
        console.log(chalk.green(`Completed todos has been cleared`));
    } else {
        // MVC type is: VIEW
        console.log(chalk.blue(`No todos are completed`));
    }
}


// MVC type is: CONTROLLER
const currentCommand = process.argv[2];
const currentTodoNumber = process.argv[3];
const supportedCommands = ['new', 'get', 'complete', 'clear', 'help'];
const todosDB = JSON.parse(fs.readFileSync("./todo-live-db.json", 'utf-8'));

// SANITY CHECK
// MVC type is: CONTROLLER
// Check if currentCommand is NOT included in supported commands
if (!supportedCommands.includes(currentCommand)) {
    console.log(chalk.red("Command not supported. App is exiting."));
    process.exit(1);
} 

// MAIN PROGRAM
// MVC type is: CONTROLLER
// ROUTER
switch (currentCommand) {
    case 'new':
        createTodo(todosDB);
        break;
    case 'get':
        getTodos(todosDB);
        break;
    case 'complete':
        completeTodo(todosDB, currentTodoNumber);
        break;
    case 'clear':
        clearCompletedTodo(todosDB);
        break;
    case 'help':
        printUsage();
        break;
    default:
        break;
}