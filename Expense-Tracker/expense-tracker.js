const { program } = require('commander');
const fs = require('fs');
const path = require('path');
let expenses = [];

// save the current date for expense tracking
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// save the expenses in a JSON file
const expensesFilePath = path.join(__dirname, 'expenses.json');
function saveExpense(expense) {
    expenses.push(expense);
    fs.writeFileSync(expensesFilePath, JSON.stringify(expenses));
}

// Load existing expenses from the file
async function loadExpenses() {
    if (fs.existsSync(expensesFilePath)) {
        expenses = JSON.parse(fs.readFileSync(expensesFilePath));
    }
    return expenses;
}

function pad(str, width) {
  str = String(str);
  return str + ' '.repeat(Math.max(width - str.length, 0));
}

function formatAmount(amount) {
  return `$${amount}`;
}

function listExpenses(expenses) {
  // Find max widths for each column
  const idWidth = Math.max(2, ...expenses.map(e => String(e.id).length));
  const dateWidth = 10; // YYYY-MM-DD is always 10 chars
  const descWidth = Math.max(11, ...expenses.map(e => e.description.length));
  const amountWidth = Math.max(6, ...expenses.map(e => formatAmount(e.amount).length));

  // Print header
  console.log(
    pad('ID', idWidth), pad('Date', dateWidth), pad('Description', descWidth), pad('Amount', amountWidth)
  );

  // Print each row
  for (const e of expenses) {
    console.log(
      pad(e.id, idWidth),
      pad(e.date, dateWidth),
      pad(e.description, descWidth),
      pad(formatAmount(e.amount), amountWidth)
    );
  }
}

function removeExpense(id) {
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
        expenses.splice(index, 1);
        fs.writeFileSync(expensesFilePath, JSON.stringify(expenses));
        console.log(`Expense with ID ${id} removed successfully.`);
    } else {
        console.error(`Expense with ID ${id} not found.`);
    }
}

function updateExpense(id, amount, description) {
    const index = expenses.findIndex(e => e.id == id);
    if (index !== -1) {
        // check if amount is provided and is a valid number
        if (amount && !isNaN(amount)) {
            expenses[index].amount = amount;
        }
        if (description) {
            // check if description is provided
            if (typeof description !== 'string' || description.trim() === '') {
                console.error('Description cannot be empty.');
                return;
            }
            expenses[index].description = description;
        }
        fs.writeFileSync(expensesFilePath, JSON.stringify(expenses));
        console.log(`Expense with ID ${id} updated successfully.`);
    } else {
        console.error(`Expense with ID ${id} not found.`);
    }
}

function summary(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const filteredExpenses = month ? expenses.filter(e => parseInt(e.date.split('-')[1]) == month) : expenses;
    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + parseInt(e.amount), 0);

    console.log('--- Expense Summary ---');
    if (month) {
        console.log(`Total Expenses for ${months[month - 1]}: ${formatAmount(totalExpenses)}`);
    } else {
        console.log(`Total Expenses: ${formatAmount(totalExpenses)}`);
    }
}

loadExpenses();

program
    .name('Expense Tracker CLI')
    .description('A command-line interface for managing expenses')
    .version('1.0.0');

program
    .command('add')
    .description('Add a new expense')
    .option('-a, --amount <amount>', 'Amount of the expense')
    .option('-d, --description <description>', 'Description of the expense')
    .action((options) => {
        const { amount, description } = options;
        // Save the expense to a CSV file
        if (!amount || !description) {
            console.error('Amount and description are required to add an expense.');
            return;
        }
        // Here you would typically save the expense to a file or database
        // For demonstration, we will just log it
        const expense = {
            id: Date.now(),
            date: currentDate,
            amount,
            description
        };
        console.log(`Expense added successfully (ID: ${expense.id})`);
        saveExpense(expense);
    });

program
    .command('list')
    .description('List all expenses')
    .action(() => {
        listExpenses(expenses);
    });

program
    .command('remove')
    .option('-i, --id <id>', 'ID of the expense to remove')
    .description('Remove an expense by ID')
    .action((options) => {
        const { id } = options;
        removeExpense(id);
        console.log(`Expense deleted successfully.`);
    });

program
    .command('update')
    .option('-i, --id <id>', 'ID of the expense to update')
    .option('-a, --amount <amount>', 'New amount for the expense')
    .option('-d, --description <description>', 'New description for the expense')
    .description('Update an existing expense')
    .action((options) => {
        const { id, amount, description } = options;
        updateExpense(id, amount, description);
    });

program
    .command('summary')
    .option('-m, --month <date>', 'Month to filter expenses')
    .description('Calculate total expenses')
    .action((options) => {
        summary(options.month);
    });

program
    .command('help')
    .description('Display help information')
    .action(() => {
        program.outputHelp();
    });

program.parse(process.argv)
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
