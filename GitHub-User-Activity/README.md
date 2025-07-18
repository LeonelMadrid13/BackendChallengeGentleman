# 🛰️ GitHub User Activity CLI

Fetch and display any GitHub user’s recent public activity right from your terminal!

---

## 🚀 Overview

This command-line tool uses the [GitHub Events API](https://docs.github.com/en/rest/activity/events?apiVersion=2022-11-28) to retrieve and show a user’s recent actions—like pushes, stars, forks, and issues—in a human-readable format. It’s perfect for practicing API consumption, working with JSON, and handling HTTP requests in Node.js without external libraries.

---

## ✨ Features

* Get a summary of any GitHub user’s latest activity (public events)
* See events like commits, issue comments, stars, forks, and more
* Clean, readable output in your terminal
* Handles errors (invalid username, no activity, or API failures)
* No dependencies! Uses only Node.js built-in modules

---

## ⚡ Usage

```bash
# Basic usage:
node github-activity.js <github-username>

# Example:
node github-activity.js kamranahmedse
```

**Sample output:**

```
- Pushed 2 commit(s) to kamranahmedse/developer-roadmap
- Starred kamranahmedse/roadmap.sh
- Opened an issue in kamranahmedse/dev-interview
```

---

## 🛠️ Requirements

* Node.js (v16 or later)
* Internet connection

---

## 🚦 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/github-activity-cli.git
   cd github-activity-cli
   ```
2. **Run the CLI**

   ```bash
   node github-activity.js <github-username>
   ```
3. (Optional) **Make it globally accessible**

   * Add a `bin` entry in `package.json`:

     ```json
     "bin": { "github-activity": "./github-activity.js" }
     ```
   * Make the script executable:

     ```bash
     chmod +x github-activity.js
     npm link
     ```
   * Now you can use it as:

     ```bash
     github-activity <github-username>
     ```

---

## 📦 How It Works

* Accepts a GitHub username as an argument
* Uses Node.js `https` module to query the GitHub API:
  `https://api.github.com/users/<username>/events`
* Parses and formats the recent activity as readable text
* Handles common API errors and edge cases

---

## 🧑‍💻 Advanced Ideas

* Filter by event type (only pushes, only stars, etc.)
* Show timestamps for each event
* Cache the results in a file to avoid API rate limits
* Fetch more user info (e.g., profile details, repo stats)
* Colorize output (if using external libraries)

---

## 🌠 Credits

Project inspired by the [roadmap.sh GitHub Activity CLI](https://roadmap.sh/projects/github-activity).

> *“If you wish to make an apple pie from scratch, you must first invent the universe.”*
> — Carl Sagan

---

## 🙋‍♂️ Happy Hacking!
