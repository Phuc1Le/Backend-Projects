const express = require("express")
const path = require("path")
const app = express()
const PORT = 3000;

const {
    getAllArticles,
    createArticle
} = require("./utils/articleManager");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res) => {
    res.render("home")
})

app.get("/test", (req, res) => {
    createArticle(
        "My First Article",
        "This is my first blog post."
    );

    res.send("Test article created.");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})