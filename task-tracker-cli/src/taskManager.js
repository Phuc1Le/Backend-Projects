const fs = require("fs");
const path = require("path");
function ensureTasksFileExists() {
    if (!fs.existsSync(tasksFilePath)) {
        fs.writeFileSync(tasksFilePath, "[]");
    }
}
const tasksFilePath = path.join(__dirname, "tasks.json");
const validStatuses = ["todo", "in-progress", "done"];
const loadTasks = ()=>{
    ensureTasksFileExists();
    try {
        const dataBuffer = fs.readFileSync(tasksFilePath);
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    }

    catch (error) {
        console.log("Error reading tasks file.");

        return [];
    }
}

const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(tasksFilePath, dataJSON);
}

function isValidId(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}
const addTask = (description) => {
    if (!description || description.trim() === "") {
        console.log("Task description is required.");
        return;
    }
    const tasks = loadTasks();
    const maxId = tasks.reduce((max, task) => {
        return task.id > max ? task.id : max;
    }, 0);
    const newTask = {
        id: maxId + 1,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTask(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

const listTasks = (status) => {
    const tasks = loadTasks();
    let filterTasks = tasks;
    if(status){
        filterTasks = tasks.filter((task) => task.status === status);
    }
    if(filterTasks.length == 0){
        console.log("No task found");
        return;
    }
    filterTasks.forEach(task => {
        console.log(`
ID: ${task.id}
Description: ${task.description}
Status: ${task.status}
Created: ${task.createdAt}
Updated: ${task.updatedAt}`);
    });
}

const updateTask = (id, newDescription) => {
    if (!isValidId(id)) {
        console.log("Invalid task ID.");
        return;
    }
    if (!newDescription || newDescription.trim() === "") {
        console.log("New description is required.");
        return;
    }
    const tasks = loadTasks();
    const task = tasks.find((task) => task.id === Number(id));

    if (!task) {
        console.log("Task not found.");
        return;
    }
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    saveTask(tasks);
    console.log("Task updated successfully.");
}

const deleteTask = (id) => {
    if (!isValidId(id)) {
        console.log("Invalid task ID.");
        return;
    }
    const tasks = loadTasks();

    const filteredTasks = tasks.filter(
        (task) => task.id !== Number(id)
    );

    if (filteredTasks.length === tasks.length) {
        console.log("Task not found.");
        return;
    }
    saveTask(filteredTasks);
    console.log("Task deleted successfully.");
}

const updateStatus = (id, newStatus) => {
    if (!isValidId(id)) {
        console.log("Invalid task ID.");
        return;
    }
    if (!validStatuses.includes(newStatus)) {
        console.log("Invalid status.");
        return;
    }
    const tasks = loadTasks();

    const task = tasks.find((task) => task.id === Number(id));

    if (!task) {
        console.log("Task not found.");
        return;
    }

    task.status = newStatus;
    task.updatedAt = new Date().toISOString();

    saveTask(tasks);

    console.log(`Task marked as ${newStatus}.`);
}
module.exports = {
    addTask,
    loadTasks,
    listTasks,
    updateTask,
    deleteTask,
    updateStatus
};