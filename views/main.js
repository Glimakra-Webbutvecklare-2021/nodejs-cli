import chalk from "chalk";

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
    alreadyCompleted: (todo) => chalk.blue(`'${todo.title}' has already been completed`),
    unknownError: chalk.red("Something went wrong"),
    commandNotSupportedError: chalk.red("Command not supported. App is exiting."),
    askTodoTitle: "Type your new todo: "
};