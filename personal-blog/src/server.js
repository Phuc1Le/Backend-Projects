const express = require("express")
const path = require("path")
const app = express()
const PORT = 3000;

const {
    getAllArticles,
    createArticle,
    getArticleById
} = require("./utils/articleManager");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    const articles = getAllArticles();

    res.render("home", {
        articles
    });
});

app.get("/article/:id", (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        return res.status(404).send("Article not found.");
    }

    res.render("article", {
        article
    });
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})