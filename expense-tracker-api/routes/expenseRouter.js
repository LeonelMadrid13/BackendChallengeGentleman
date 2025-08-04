import morgan from 'morgan';
import express from 'express';

import { checkToken } from '../middleware/authMiddleware.js';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js';


const router = express.Router();

// router.use(checkToken);
router.use(morgan('dev')); // Log HTTP requests

// Define a route for getting expenses
router.get('/expenses', getExpenses);

// Define a route for adding an expense
router.post('/expenses', createExpense);

// Define a route for updating an expense
router.put('/expenses/:id', updateExpense);

// Define a route for deleting an expense
router.delete('/expenses/:id', deleteExpense);

export default router;