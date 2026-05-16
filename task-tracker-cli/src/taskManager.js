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

module.exports = {
    addTask
};