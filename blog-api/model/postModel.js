const pool= require("../config/db")
const findAll = async (term) => {
    if (term) {
        const result = await pool.query(
            `
            SELECT *
            FROM posts
            WHERE
                title ILIKE $1
                OR content ILIKE $1
                OR category ILIKE $1
            ORDER BY created_at DESC
            `,
            [`%${term}%`]
        );

        return result.rows;
    }
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
const create = async(post) => {
    const result = await pool.query(
        `
        INSERT INTO posts (
            title,
            content,
            category
        )
        VALUES (
            $1,
            $2,
            $3
        )
        RETURNING *
        `,
        [
            post.title,
            post.content,
            post.category
        ]
    );
    return result.rows[0];
}
const update = async(id, post) => {
    const result = await pool.query(
        `
        UPDATE posts
        SET
            title = $1,
            content = $2,
            category = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
        `,
        [
            post.title,
            post.content,
            post.category,
            id
        ]
    );
    return result.rows[0];
}
const deletePost = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM posts
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
}
module.exports = {
    findAll,
    findById,
    create,
    update,
    deletePost
}