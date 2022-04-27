import chalk from "chalk";
import fs from 'fs';

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
    unknownError: chalk.red("Something went wrong")
};

const todoController = {
    createTodo: function () {

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
        console.log(todoViews.todoSaved);
        return true;
    },
    clearCompletedTodos: function () {
        const numOfCompleted = todoModel.clearTodos();

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
        return false;
    },
    clearTodos: function() {
        // const allTodos = JSON.parse(fs.readFileSync("./todo-live-db.json", 'utf-8'));
        const allTodos = this.getTodos();
        const completedTodos = allTodos.filter(todo => todo.completed); 
        const uncompletedTodos = allTodos.filter(todo => !todo.completed); 
        fs.writeFileSync("./todo-live-db.json", JSON.stringify(uncompletedTodos));
        return completedTodos.length;
    },
};

// TESTING
todoController.getTodosView();
todoController.clearCompletedTodos();
todoController.getTodosView();






