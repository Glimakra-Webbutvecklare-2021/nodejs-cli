import { todoController } from "./controllers/main.js";
import { todoViews } from "./views/main.js";

const currentCommand = process.argv[2];
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
