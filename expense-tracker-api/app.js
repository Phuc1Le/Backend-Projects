require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(
    "/expenses",
    authenticateToken,
    expenseRoutes
);

app.listen(
    process.env.PORT,
    () => {
        console.log(
            `Server running on port ${process.env.PORT}`
        );
    }
);