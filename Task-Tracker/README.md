# 📝 Task Tracker CLI

A simple, file-based **Command Line Task Tracker** — built for learning and productivity.
Easily manage what you need to do, what you’re working on, and what you’ve finished — all from your terminal!

---

## 🚀 Overview

This project is a minimal but powerful CLI application for managing tasks.
It helps you track, update, and list your todos right from the command line, practicing core programming skills:

* Working with the filesystem
* Handling user input via command line arguments
* Building robust CLI apps without any external dependencies

---

## 🎯 Features

* **Add, update, and delete tasks**
* **Mark tasks as "todo", "in-progress", or "done"**
* **List all tasks or filter by status**
* **Persistent storage in a JSON file (created automatically if missing)**
* **Error handling and clear feedback for each command**

---

## ⚡ Commands & Usage

```bash
# Add a new task
task-cli add "Buy groceries"

# Update or delete tasks by ID
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Mark task status
task-cli mark-in-progress 1
task-cli mark-done 1

# List all tasks or filter by status
task-cli list
task-cli list done
task-cli list todo
task-cli list in-progress
```

---

## 📦 Task Data Format

Each task is stored with:

| Field       | Example Value                       | Description                  |
| ----------- | ----------------------------------- | ---------------------------- |
| id          | `1`                                 | Unique identifier (integer)  |
| description | `"Buy groceries"`                   | What the task is about       |
| status      | `"todo"`, `"in-progress"`, `"done"` | The task’s current state     |
| createdAt   | `"2025-07-16T19:45:30.001Z"`        | ISO date-time of creation    |
| updatedAt   | `"2025-07-16T19:50:15.128Z"`        | ISO date-time of last update |

---

## 🛠️ Requirements

* **Runs from the command line** (Node.js, Python, etc.)
* **No external libraries** or frameworks
* **Uses only native file system APIs**
* **Persists data in a local `tasks.json` file**
* **Graceful error handling**

---

## 🚦 Getting Started

1. **Clone this repo**

   ```bash
   git clone https://github.com/yourusername/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. **(Optional) Make the CLI globally accessible**

   * For Node.js, add a `bin` entry in `package.json` and link with `npm link`
   * For Python, add an entry point or use a shell alias

3. **Run commands as shown above**

---

## 🧑‍💻 Development Tips

* **Choose your language:** Python and Node.js are popular choices for CLIs
* **Structure your code:** Modularize features (e.g., commands, file I/O, utilities)
* **Test each command**: Try invalid arguments, missing files, etc.
* **Use Git for version control**
* **Comment your code** for readability

---

## 🧠 What You’ll Learn

* How to build a CLI from scratch
* Parsing and validating command line arguments
* Working with the file system (read/write JSON)
* Managing unique IDs and task state
* Handling errors and edge cases
* Organizing code for clarity

---

## 🛣️ Possible Extensions

* Support for due dates and priorities
* Task search/filtering by text
* Export/import tasks
* Colorized terminal output
* Unit tests

---

## 🌠 Credits

Based on the open-source challenge from [roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker).

> *“Somewhere, something incredible is waiting to be known.”*
> — Carl Sagan

---
