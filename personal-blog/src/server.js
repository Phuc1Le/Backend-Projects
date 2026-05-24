const express = require("express")
const path = require("path")
const app = express()
const PORT = 3000;

const {
    getAllArticles,
    createArticle,
    getArticleById,
    editArticleById,
    deleteArticleById
} = require("./utils/articleManager");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }));

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
        article,
        isAdminView: false
    });
});

app.get("/admin", (req, res) => {
    const articles = getAllArticles();

    res.render("dashboard", {
        articles
    });
})

app.get("/admin/article/:id", (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        return res.status(404).send("Article not found.");
    }

    res.render("article", {
        article,
        isAdminView: true
    });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/new", (req, res) => {
    const { title, content } = req.body;

    createArticle(title, content);

    res.redirect("/admin");
});

app.get("/edit/:id", (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        return res.status(404).send("Article not found.");
    }

    res.render("edit", {
        article
    });
});

app.post("/edit/:id", (req, res) => {
    const { title, content } = req.body;
    const updatedArticle = editArticleById(
        req.params.id,
        title,
        content
    );

    if (!updatedArticle) {
        return res.status(404).send("Article not found.");
    }

    res.redirect("/admin");
})

app.post("/delete/:id", (req, res) => {
    const deleted = deleteArticleById(
        req.params.id
    );

    if (!deleted) {
        return res.status(404).send(
            "Article not found."
        );
    }

    res.redirect("/admin");
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})