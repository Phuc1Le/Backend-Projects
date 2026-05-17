const { addTask, listTasks } = require("./taskManager");

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} 
else if(command === "list"){
    console.log(argument);
    listTasks(argument);
}
else {
    console.log("Unknown command");
}