#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');


function loadTasks() {
    // Ensure the tasks file exists and is initialized
    // If the file does not exist, create it with an empty array
    if (!fs.existsSync(TASKS_FILE)) {
        fs.openSync(TASKS_FILE, 'w');
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
    }
    // Read the tasks from the file
    const data = fs.readFileSync(TASKS_FILE);
    // Parse the JSON data and return it
    return JSON.parse(data);
}

function saveTasks(tasks) {
    // Convert the tasks array to JSON and write it to the file
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Get command line arguments, excluding the first two (node and script path)
const args = process.argv.slice(2);

// If no arguments are provided or the first argument is a help command, display usage information
if (args.length === 0 || args[0] === '--help' || args[0] === '-h' || args[0] === 'help') {
    console.log('Usage: task-cli <command> [options]');
    console.log('Commands:');
    console.log('  help (--help, -h)              Show this help message');
    console.log('  add <task>                     Add a new task');
    console.log('  update <id> <new description>  Update a task description');
    console.log('  list                           List all tasks');
    console.log('  mark-in-progress <id>          Mark a task as in progress');
    console.log('  mark-done <id>                 Mark a task as done');
    console.log('  delete <id>                    Remove a task by ID');
    process.exit(1);
}

// Get the command from the first argument
const command = args[0];
// Load existing tasks from the file
const tasks = loadTasks();

// Handle the command based on the first argument
switch (command) {
    case 'add':
        // If the command is 'add', check if a task description is provided
        if (args.length < 2) {
        console.error('Please provide a task description.');
        process.exit(1);
        }

        // Join the remaining arguments to form the task description
        const taskDescription = args.slice(1).join(' ').toString();
        const taskId = Date.now().toString();

        // Create a new task object with a unique ID, description, and default status
        const task ={ 
            id: taskId, 
            description: taskDescription, 
            status: 'todo', 
            createdAt: new Date().toISOString(), 
            updatedAt: new Date().toISOString()
        };
        // Add the new task to the tasks array and save it to the file
        tasks.push(task);
        saveTasks(tasks);
        console.log(`Task added with ID: ${taskId}`);
        break;
    case 'list':
        // If the command is 'list', check if there are any tasks
        if (tasks.length === 0) {
            console.log('No tasks found.');
        } else {
            const options = ['all', 'todo', 'in-progress', 'done'];
            // If a specific list method is provided, filter tasks accordingly
            const listMethod = args[1] || 'all';
            if (!options.includes(listMethod)) {
                console.error(`Invalid list method: ${listMethod}. Use one of: ${options.join(', ')}`);
                process.exit(1);
            }

            // Filter tasks based on the specified status
            let tasksToDisplay = tasks.filter((task) => {
                if (listMethod === 'all') return true;
                return task.status === listMethod;
            });
            
            // If no tasks match the specified status, display a message
            if (tasksToDisplay.length === 0) {
                console.log(`No tasks found with status: ${listMethod}`);
                process.exit(0);
            }

            console.log('Tasks:');
            tasksToDisplay.forEach(task => {
                console.log(task);
            });
        }
        break;
    case 'delete':
        // If the command is 'delete', check if a task ID is provided
        if (args.length < 2) {
            console.error('Please provide a task ID to delete.');
            process.exit(1);
        }

        // Find the task by ID and remove it from the tasks array
        const taskIdToDelete = args[1];
        const taskIndex = tasks.findIndex(task => task.id === taskIdToDelete);

        // If the task is not found, display an error message and exit
        if (taskIndex === -1) {
            console.error(`Task with ID ${taskIdToDelete} not found.`);
            process.exit(1);
        }

        // Remove the task from the array and save the updated tasks to the file
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        console.log(`Task with ID ${taskIdToDelete} deleted.`);
        break;
    case 'mark-in-progress':
        // If the command is 'mark-in-progress', check if a task ID is provided
        if (args.length < 2) {
            console.error('Please provide a task ID to mark as in progress.');
            process.exit(1);
        }

        // Find the task by ID and update its status to 'in-progress'
        const taskIdToMarkInProgress = args[1];
        const taskToMarkInProgress = tasks.find(task => task.id === taskIdToMarkInProgress);
        if (!taskToMarkInProgress) {
            console.error(`Task with ID ${taskIdToMarkInProgress} not found.`);
            process.exit(1);
        }

        // Update the task's status and updatedAt timestamp
        taskToMarkInProgress.status = 'in-progress';
        taskToMarkInProgress.updatedAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task with ID ${taskIdToMarkInProgress} marked as in progress.`);
        break;
    case 'mark-done':
        // If the command is 'mark-done', check if a task ID is provided
        if (args.length < 2) {
            console.error('Please provide a task ID to mark as done.');
            process.exit(1);
        }

        // Find the task by ID and update its status to 'done'
        const taskIdToMarkDone = args[1];
        const taskToMarkDone = tasks.find(task => task.id === taskIdToMarkDone);
        if (!taskToMarkDone) {
            console.error(`Task with ID ${taskIdToMarkDone} not found.`);
            process.exit(1);
        }

        // Update the task's status and updatedAt timestamp
        taskToMarkDone.status = 'done';
        taskToMarkDone.updatedAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task with ID ${taskIdToMarkDone} marked as done.`);
        break;
    case 'update':
        // If the command is 'update', check if a task ID and new description are provided
        if (args.length < 3) {
            console.error('Please provide a task ID and a new description to update.');
            process.exit(1);
        }

        // Find the task by ID and update its description
        const taskIdToUpdate = args[1];
        const newDescription = args.slice(2).join(' ');
        const taskToUpdate = tasks.find(task => task.id === taskIdToUpdate);
        if (!taskToUpdate) {
            console.error(`Task with ID ${taskIdToUpdate} not found.`);
            process.exit(1);
        }
        
        // Update the task's description and updatedAt timestamp
        taskToUpdate.description = newDescription;
        taskToUpdate.updatedAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task with ID ${taskIdToUpdate} updated.`);
        break;
    default:
        // If the command is unknown, display an error message and exit
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }