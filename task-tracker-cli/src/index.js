const { addTask } = require("./taskManager");

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} else {
    console.log("Unknown command");
}