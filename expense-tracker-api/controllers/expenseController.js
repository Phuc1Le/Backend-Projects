const expenseModel = require("../models/expenseModel");
const createExpense = async (req, res) => {
    try {
        const { amount, description, category, expense_date} = req.body;
        if (!amount || !category || !expense_date){
            return res.status(400).json({
                message:
                    "Required fields missing"
            });
        }

        const expense = await expenseModel.createExpense({
                            userId: req.user.id,
                            amount,
                            description,
                            category,
                            expenseDate:
                                expense_date
                        });
        res.status(201).json(
            expense
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                "Internal server error"
        });
    }
}
const getExpenses = async (req, res) => {
    try {
        const {
            period,
            startDate,
            endDate
        } = req.query;
        const expenses =
            await expenseModel.getExpensesByUserId(
                req.user.id,
                {
                    period,
                    startDate,
                    endDate
                }
            );
        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                "Internal server error"
        });
    }
}
const updateExpense = async (req, res) => {
    try {
        const expenseId = Number(req.params.id);
        
        const {amount, description, category, expense_date} = req.body;
        const updatedExpense =
            await expenseModel
                .updateExpense(
                    expenseId,
                    req.user.id,
                    {
                        amount,
                        description,
                        category,
                        expenseDate:
                            expense_date
                    }
                );
        if (!updatedExpense) {
            return res.status(404).json({
                message:
                    "Expense not found"
            });
        }
        res.json(updatedExpense);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Internal server error"
        });

    }
}
async function deleteExpense(
    req,
    res
) {
    try {

        const expenseId =
            Number(req.params.id);

        const deletedExpense =
            await expenseModel
                .deleteExpense(
                    expenseId,
                    req.user.id
                );

        if (!deletedExpense) {
            return res.status(404).json({
                message:
                    "Expense not found"
            });
        }

        res.status(204).send();

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Internal server error"
        });
    }
}
module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}