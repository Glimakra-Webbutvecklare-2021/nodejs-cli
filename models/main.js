import fs from 'fs';

const dbPath = "./todo-live-db.json";

export const todoModel = {
    getTodos: function() {
        return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    },
    saveTodos: function(todos) {
        return fs.writeFileSync(dbPath, JSON.stringify(todos));
    },
    addTodo: function(title) {
        // Create new todo
        const newTodo = {title: title, completed: false};

        // Retreive current state of DB as Javascript array
        const allTodos = this.getTodos();

        // Update Javascript array with new todo
        allTodos.push(newTodo);

        // Write new state to DB
        this.saveTodos(allTodos);
        
        return true;
    },
    completeTodo: function(idx) {
        const allTodos = this.getTodos();

        // Make sure the selected todo is completed
        allTodos[idx].completed = true;
        
        // Save new state
        this.saveTodos(allTodos);
        return true;
    },
    clearCompletedTodos: function() {
        const allTodos = this.getTodos();
        const completedTodos = allTodos.filter(todo => todo.completed); 
        const uncompletedTodos = allTodos.filter(todo => !todo.completed); 
        this.saveTodos(uncompletedTodos);

        // Return the amount of compeleted todos that was cleared
        return completedTodos.length;
    },
};