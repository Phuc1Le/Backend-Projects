const pool = require("../config/db");
const createExpense = async (expense) => {
    const result =
        await pool.query(
            `
            INSERT INTO expenses (
                user_id,
                amount,
                description,
                category,
                expense_date
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING *
            `,
            [
                expense.userId,
                expense.amount,
                expense.description,
                expense.category,
                expense.expenseDate
            ]
        );

    return result.rows[0];
}
async function getExpensesByUserId(
    userId,
    filters = {}
) {
    let query = `
        SELECT *
        FROM expenses
        WHERE user_id = $1
    `;

    const values = [userId];
    if(filters.period === "day"){
        query += `
            AND expense_date >=
            NOW() - INTERVAL '1 day'
        `;
    }
    else if (filters.period === "week") {
        query += `
            AND expense_date >=
            CURRENT_DATE - INTERVAL '7 days'
        `;
    }

    else if (filters.period === "month") {
        query += `
            AND expense_date >=
            CURRENT_DATE - INTERVAL '1 month'
        `;
    }

    else if (filters.period === "3months") {
        query += `
            AND expense_date >=
            CURRENT_DATE - INTERVAL '3 months'
        `;
    }

    if (filters.startDate) {
        values.push(filters.startDate);

        query += `
            AND expense_date >= $${values.length}
        `;
    }

    if (filters.endDate) {
        values.push(filters.endDate);

        query += `
            AND expense_date <= $${values.length}
        `;
    }

    query += `
        ORDER BY expense_date DESC
    `;

    const result = await pool.query(
        query,
        values
    );

    return result.rows;
}
const updateExpense = async (expenseId, userId, expense) => {
    const result =
        await pool.query(
            `
            UPDATE expenses
            SET
                amount = $1,
                description = $2,
                category = $3,
                expense_date = $4
            WHERE
                id = $5
                AND user_id = $6
            RETURNING *
            `,
            [
                expense.amount,
                expense.description,
                expense.category,
                expense.expenseDate,
                expenseId,
                userId
            ]
        );

    return result.rows[0];
}
async function deleteExpense(
    expenseId,
    userId
) {
    const result =
        await pool.query(
            `
            DELETE FROM expenses
            WHERE
                id = $1
                AND user_id = $2
            RETURNING *
            `,
            [
                expenseId,
                userId
            ]
        );

    return result.rows[0];
}
module.exports = {
    createExpense,
    getExpensesByUserId,
    updateExpense,
    deleteExpense
}