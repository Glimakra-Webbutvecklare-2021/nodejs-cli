import fs from 'fs';

export const todoModel = {
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