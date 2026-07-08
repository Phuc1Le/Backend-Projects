const WebSocket = require("ws");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const socket = new WebSocket("ws://localhost:8080");

socket.on("open", () => {
    console.log("Connected to server!");
    rl.on("line", (line) => {
        socket.send(line);
    });
});
socket.on("message", (message) => {
    console.log(message.toString());
});