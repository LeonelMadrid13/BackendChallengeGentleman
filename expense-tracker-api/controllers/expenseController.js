import { getPrismaClient } from '../lib/prisma.js';
import { handleError } from '../lib/handleError.js';
import { getDateRange } from '../lib/dateRanges.js';

const createExpense = async (req, res) => {
    const prisma = await getPrismaClient();
    try {
        const { amount, description, category, userId } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const expense = await prisma.expense.create({
            data: {
                amount,
                description,
                category,
                user: {
                    connect: { id: userId }
                }
            }
        });

        return res.status(201).json({ success: true, data: expense });
    } catch (error) {
        handleError(res, error, 'Create Expense Error');
    }
};

const getExpenses = async (req, res) => {
    const prisma = await getPrismaClient();
    try {
        let { filter, start, end } = req.query; // filter can be 'week', 'month', etc.
        let dateRange = {};

        if (filter) {
            // Get date range based on filter or custom
            dateRange = filter === 'custom'
                ? getDateRange(filter, start, end)
                : getDateRange(filter);
        } else if (start) {
            // Only custom range passed, fallback
            dateRange = {
                start: new Date(start),
                end: new Date(end || new Date())
            };
            dateRange.end.setDate(dateRange.end.getDate() + 1);
        }

        const where = dateRange.start && dateRange.end
            ? { createdAt: { gte: dateRange.start, lt: dateRange.end } }
            : {};

        const expenses = await prisma.expense.findMany({ where });

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
