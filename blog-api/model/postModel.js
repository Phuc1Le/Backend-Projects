const pool= require("../config/db")
const findAll = async () => {
    const result = await pool.query("SELECT * FROM posts")
    return result.rows
}
const findById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM posts
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}
module.exports = {
    findAll,
    findById
}