const WebSocket = require("ws");
const server = new WebSocket.Server({
    port: 8080
});
const clients = new Set();
console.log("Broadcast server running on port 8080");
server.on("connection", (socket) => {
    console.log("A client connected!");
    clients.add(socket);
    socket.on("message", (message) => {
        for(const client of clients){
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        }
    });
    socket.on("close", () => {
        console.log("A client disconnected.");
        clients.delete(socket);
    });
});
