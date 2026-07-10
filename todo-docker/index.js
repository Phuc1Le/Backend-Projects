const express = require("express");
const connectDB = require("./database");

const todoRoutes = require("./routes/todos");

const app = express();
const PORT = 3000;


// Middleware
app.use(express.json());

connectDB();
// Routes
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Todo API is running");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});