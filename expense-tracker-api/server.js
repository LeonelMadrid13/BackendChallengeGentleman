// import necessary modules
import express from 'express';

// import routes
import expenseRouter from './routes/expenseRouter.js';
import loginRouter from './routes/loginRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', expenseRouter);
app.use('/api', loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});