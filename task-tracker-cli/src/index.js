const { addTask, listTasks, loadTasks, updateTask, deleteTask } = require("./taskManager");
const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} 
else if(command === "list"){
    listTasks(argument);
}
else if(command === "update"){
    const newDescription = process.argv[4];

    updateTask(argument, newDescription);
}
else if(command === "delete"){
    deleteTask(argument);
}
else {
    console.log("Unknown command");
}