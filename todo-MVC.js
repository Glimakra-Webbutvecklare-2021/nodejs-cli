import chalk from "chalk";
import fs from 'fs';
import readline from 'readline';

// VIEWS
export const todoViews = {
    usage: `Welcome to Todo app
Usage:

    new:        used to create new todo
    get:        used to get all todos
    complete <number>: used set todo to complete
    clear:      used to remove completed todos
    help:       used to display instructions
 `,
    todos: (todos) => 
        todos.map((todo, idx) => 
        `${idx+1}. ${todo.title} ${todo.completed ? '[x]' : '[ ]'}`).join('\n')
    ,
    todoSaved: chalk.green("Todo saved"),
    todoNumberInvalid: chalk.red("Invalid todo number"),
    todoCompleted: (todo) => chalk.green(`'${todo.title}' has been completed`),
    todosCleared: chalk.green(`Completed todos has been cleared`),
    noTodosCleared: chalk.blue(`No todos are completed`),
    unknownError: chalk.red("Something went wrong"),
    commandNotSupportedError: chalk.red("Command not supported. App is exiting."),
    askTodoTitle: "Type your new todo: "
};

// CONTROLLER
const todoController = {
    createTodo: function () {
        // Ask user what the new todo is called
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(todoViews.askTodoTitle, function(todoTitle) {
            const success = todoModel.addTodo(todoTitle);
            if (!success) {
                console.log(todoViews.unknownError);
                return;
            }
            console.log(todoViews.todoSaved);
            rl.close();
        })
    },
    getTodosView: function () {
       // Get all todos from DB
       const allTodos = todoModel.getTodos();
       
       // Fill in template with todos
       const view = todoViews.todos(allTodos);

       // Show the populated view
       console.log(view);
    },
    completeTodo: function (todoNumber) {
        // SANTIY CHECK 
        const idx = Number(todoNumber) - 1;
        const allTodos = todoModel.getTodos();
        if (idx < 0 || idx >= allTodos.length) {
            console.log(todoViews.todoNumberInvalid);
            process.exit(1);
        }

        // Update specified todo via model
        const success = todoModel.completeTodo(idx);

        // Something went wrong
        if (!success) {
            console.log(todoViews.unknownError);
            return false;
        }

        // Everything went well
        console.log(todoViews.todoCompleted(allTodos[idx]));
        return true;
    },
    clearCompletedTodos: function () {
        const numOfCompleted = todoModel.clearCompletedTodos();

        console.log(
            numOfCompleted > 0 ? 
            todoViews.todosCleared : 
            todoViews.noTodosCleared
            );
    },
    printUsage: function () {
        console.log(todoViews.usage);
    }
};

// MODEL
const todoModel = {
    getTodos: function() {
        return JSON.parse(fs.readFileSync("./todo-live-db.json", 'utf-8'));
    },
    saveTodos: function(todos) {},
    addTodo: function(title) {
        // Create new todo
        const newTodo = {title: title, completed: false};

        // Retreive current state of DB as Javascript array
        // const allTodos = JSON.parse(fs.readFileSync("./todo-live-db.json", 'utf-8'));
        const allTodos = this.getTodos();
        // Update Javascript array with new todo
        allTodos.push(newTodo);

        // Write new state to DB
        fs.writeFileSync("./todo-live-db.json", JSON.stringify(allTodos));
        
        return true;
    },
    completeTodo: function(idx) {
        // const allTodos = JSON.parse(fs.readFileSync("./todo-live-db.json", 'utf-8'));
        const allTodos = this.getTodos();
        allTodos[idx].completed = true;
        fs.writeFileSync("./todo-live-db.json", JSON.stringify(allTodos));
        return true;
    },
    clearCompletedTodos: function() {
        // const allTodos = JSON.parse(fs.readFileSync("./todo-live-db.json", 'utf-8'));
        const allTodos = this.getTodos();
        const completedTodos = allTodos.filter(todo => todo.completed); 
        const uncompletedTodos = allTodos.filter(todo => !todo.completed); 
        fs.writeFileSync("./todo-live-db.json", JSON.stringify(uncompletedTodos));
        return completedTodos.length;
    },
};

// TESTING
// todoController.getTodosView();
// todoController.createTodo();
// todoController.getTodosView();

// MAIN PROGRAM
// MVC type is: CONTROLLER
// ROUTER
const currentCommand = process.argv[2]; // undefined
const currentTodoNumber = process.argv[3];
const supportedCommands = ['new', 'get', 'complete', 'clear', 'help'];

// check if currentCommand exists AND is not included in Supported Commands Array
if (currentCommand && !supportedCommands.includes(currentCommand)) {
    console.log(todoViews.commandNotSupportedError);
    process.exit(1);
} 

switch (currentCommand) {
    case 'new':
        todoController.createTodo();
        break;
    case 'get':
        todoController.getTodosView();
        break;
    case 'complete':
        todoController.completeTodo(currentTodoNumber);
        break;
    case 'clear':
        todoController.clearCompletedTodos();
        break;
    case 'help':
        todoController.printUsage();
        break;
    default:
        todoController.printUsage();
        break;
}






