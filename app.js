import { todoController } from "./controllers/main.js";
import { todoViews } from "./views/main.js";

// Varibles that captures the intent of the user
const currentCommand = process.argv[2];
const currentTodoNumber = process.argv[3];

// Our list of supported commands
const supportedCommands = ['new', 'get', 'complete', 'clear', 'help'];

// check if currentCommand exists AND is not included in `supportedCommands`
if (currentCommand && !supportedCommands.includes(currentCommand)) {
    console.log(todoViews.commandNotSupportedError);
    process.exit(1);
}

// TODO: make sure if running `complete` currentTodoNumber is defined!

// Router: Redirects to specific controller method based on currentCommand
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
