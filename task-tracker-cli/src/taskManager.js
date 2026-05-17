const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "tasks.json");
const loadTasks = ()=>{
    const dataBuffer = fs.readFileSync(tasksFilePath);
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON);
}

const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(tasksFilePath, dataJSON);
}

const addTask = (description) => {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
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
module.exports = {
    addTask,
    loadTasks,
    listTasks
};