const fs = require("fs");
const path = require("path");
const articlesDirectory = path.join(__dirname, "../../articles");
const getAllArticles = () => {
    const files = fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".json"));

    const articles = files.map((file) => {
        const filePath = path.join(articlesDirectory, file);

        const fileContent = fs.readFileSync(filePath, "utf-8");

        return JSON.parse(fileContent);
    });

    return articles;
};
const createArticle = (title, content) => {
    // const articles = getAllArticles();

    const newArticle = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString()
    };

    const filePath = path.join(
        articlesDirectory,
        `${newArticle.id}.json`
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(newArticle, null, 2)
    );

    return newArticle;
};
module.exports = {
    getAllArticles,
    createArticle
};