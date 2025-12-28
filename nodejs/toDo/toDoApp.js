const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "todos.json");

// Read todos safely
function readTodos() {
    try {
        if (!fs.existsSync(FILE_PATH)) {
            fs.writeFileSync(FILE_PATH, "[]");
        }
        const data = fs.readFileSync(FILE_PATH, "utf8");
        return JSON.parse(data);
    } 
    catch (err) {
        console.error(`Error reading todo file, \n Error: ${err}`);
        return [];
    }
}

// Write todos safely
function writeTodos(todos) {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
    } catch (err) {
        console.error(`Error writing todo file, \n Error: ${err}`);
    }
}

// Get command & argument
const command = process.argv[2];
const argument = process.argv.slice(3).join(" ");

switch (command) {
    case "add": {
        if (!argument) {
            console.log("Please provide a task to add.");
            break;
        }
        const todos = readTodos();
        todos.push(argument);
        writeTodos(todos);
        console.log("Task added.");
        break;
        }

    case "list": {
        const todos = readTodos();
        if (todos.length === 0) {
            console.log("No tasks found.");
            break;
        }
        console.log("Your To-Do List:");
        todos.forEach((task, index) => {
            console.log(`${index}: ${task}`);
        });
        break;
    }

    case "delete": {
        const index = Number(argument);
        if (isNaN(index)) {
            console.log("Please provide a valid index.");
            break;
        }
        const todos = readTodos();
        if (index < 0 || index >= todos.length) {
            console.log("Invalid index.");
            break;
        }
        const removed = todos.splice(index, 1);
        writeTodos(todos);
        console.log(`Removed: ${removed[0]}`);
        break;
    }

    default:
        console.log(`
            To-Do CLI Usage:
            node app.js add "Task name"
            node app.js list
            node app.js delete <index>
        `);
}