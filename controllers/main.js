import readline from 'readline';
import { todoModel } from '../models/main.js';
import { todoViews } from '../views/main.js';

export const todoController = {
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

        const todo = allTodos[idx];
        if(todo.completed) {
            console.log(todoViews.alreadyCompleted(todo));
            return true;
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
