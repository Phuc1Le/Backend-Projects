const command = process.argv[2];

if (command === "start") {
    require("./server");
} else if (command === "connect") {
    require("./client");
} else {
    console.log("Unknown command.");
}