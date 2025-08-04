import { getPrismaClient } from '../lib/prisma.js';
import { handleError } from '../lib/handleError.js';

const createExpense = async (req, res) => {
    const prisma = await getPrismaClient();
    try {
        const { amount, description, category } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const expense = await prisma.expense.create({
            data: {
                amount,
                description,
                category,
            },
        });

        return res.status(201).json({ success: true, data: expense });
    } catch (error) {
        handleError(res, error, 'Create Expense Error');
    }
};

const getExpenses = async (req, res) => {
    const prisma = await getPrismaClient();
    try {
        const expenses = await prisma.expense.findMany();
        return res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        handleError(res, error, 'Get Expenses Error');
    }
};

const updateExpense = async (req, res) => {
    const prisma = await getPrismaClient();
    try {
        const { id } = req.params;
        const { amount, description, category } = req.body;

        const expense = await prisma.expense.update({
            where: { id },
            data: { amount, description, category },
        });

        return res.status(200).json({ success: true, data: expense });
    } catch (error) {
        handleError(res, error, 'Update Expense Error');
    }
};

const deleteExpense = async (req, res) => {
    const prisma = await getPrismaClient();
    try {
        const { id } = req.params;

        await prisma.expense.delete({
            where: { id },
        });

        return res.status(204).json({ success: true });
    } catch (error) {
        handleError(res, error, 'Delete Expense Error');
    }
};

export {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};
