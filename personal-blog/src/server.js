require("dotenv").config();
const express = require("express")
const path = require("path")
const session = require("express-session");
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
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
app.use(express.urlencoded({ extended: true }));
const requireAuth = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect("/login");
    }

    next();
};
app.get("/login", (req, res) => {
    res.render("login", {
        error: null
    });
});
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        req.session.isAdmin = true;

        return res.redirect("/admin");
    }

    return res.render("login", {
        error: "Invalid username or password."
    });
});
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

app.get("/admin", requireAuth, (req, res) => {
    const articles = getAllArticles();

    res.render("dashboard", {
        articles
    });
})

app.get("/admin/article/:id", requireAuth, (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        return res.status(404).send("Article not found.");
    }

    res.render("article", {
        article,
        isAdminView: true
    });
});

app.get("/new", requireAuth, (req, res) => {
    res.render("new");
});

app.post("/new", requireAuth, (req, res) => {
    const { title, content } = req.body;

    createArticle(title, content);

    res.redirect("/admin");
});

app.get("/edit/:id", requireAuth, (req, res) => {
    const article = getArticleById(req.params.id);

    if (!article) {
        return res.status(404).send("Article not found.");
    }

    res.render("edit", {
        article
    });
});

app.post("/edit/:id", requireAuth, (req, res) => {
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

app.post("/delete/:id", requireAuth, (req, res) => {
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