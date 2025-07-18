# 💸 Expense Tracker CLI

A simple command-line expense tracker to manage your personal finances—add, update, delete, and summarize your expenses right from your terminal.

---

## 🚀 Overview

This project lets you track your expenses from the command line. Quickly add what you spend, view totals, see your history, and get summaries per month—all using a file-based database you control.

---

## ✨ Features

* Add a new expense (with description and amount)
* Update or delete an existing expense
* View all expenses in a table
* View total spending (summary)
* View a summary for a specific month
* Error handling for invalid input and non-existent IDs

**Bonus (optional):**

* Categorize expenses and filter by category
* Set monthly budgets and get warnings if you exceed them
* Export data to CSV

---

## ⚡ Usage Examples

```bash
# Add an expense
expense-tracker add --description "Lunch" --amount 20
# Output: Expense added successfully (ID: 1)

# Add another expense
expense-tracker add --description "Dinner" --amount 10
# Output: Expense added successfully (ID: 2)

# List all expenses
expense-tracker list
# ID  Date       Description  Amount
# 1   2024-08-06 Lunch       $20
# 2   2024-08-06 Dinner      $10

# View total summary
expense-tracker summary
# Total expenses: $30

# Delete an expense
expense-tracker delete --id 2
# Output: Expense deleted successfully

# Summary for a specific month
expense-tracker summary --month 8
# Total expenses for August: $20
```

---

## 🛠️ Requirements & Implementation Notes

* Runs from the command line (Node.js, Python, etc.)
* Use built-in libraries for argument parsing and file handling
* Store all expenses in a text file (`expenses.json`, `expenses.csv`, etc.)
* Modularize your code for easy updates and testing
* Handle errors gracefully (e.g., negative amounts, missing fields)

---

## 🚦 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/expense-tracker-cli.git
   cd expense-tracker-cli
   ```
2. **Run the CLI**

   ```bash
   node expense-tracker.js add --description "Lunch" --amount 20
   node expense-tracker.js list
   node expense-tracker.js summary --month 8
   ```
3. (Optional) **Make it globally accessible**

   * Add a `bin` entry to your `package.json`
   * `chmod +x expense-tracker.js` and `npm link`
   * Use as `expense-tracker ...` anywhere

---

## 📦 Expense Data Format

| Field       | Example Value     | Description                      |
| ----------- | ----------------- | -------------------------------- |
| id          | 1                 | Unique integer ID                |
| date        | 2024-08-06        | Date of the expense (YYYY-MM-DD) |
| description | "Lunch"           | Description of the expense       |
| amount      | 20                | Amount spent (positive number)   |
| category    | "Food" (optional) | Expense category                 |

---

## 🧑‍💻 Advanced Ideas

* Filter/list by category
* Monthly budgets with over-budget alerts
* CSV export
* Colorful CLI output
* More robust error messages

---

## 🌠 Credits

Inspired by the [roadmap.sh Expense Tracker CLI](https://roadmap.sh/projects/expense-tracker).

> *“Somewhere, something incredible is waiting to be known.”*
> — Carl Sagan

---

## 🙋‍♂️ Happy tracking!
