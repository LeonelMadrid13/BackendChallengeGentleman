# 📝 Personal Blog Project

Build and manage your own simple personal blog — practice your backend, templating, and file handling skills without any complex frameworks or databases!

---

## 🌟 Overview

This project is a beginner-friendly, full-stack blog where you can write, edit, and publish articles. There are two main sections:

* **Guest section** (for anyone): list and view published articles
* **Admin section** (for you): add, edit, or delete articles via a dashboard

---

## 🖼️ Example Pages

**Guest view:**

![Guest page wireframe](https://assets.roadmap.sh/guest/blog-guest-pages.png)

**Admin view:**

![Admin page wireframe](https://assets.roadmap.sh/guest/blog-admin-pages.png)

---

## 🚦 Features

* Home page: see a list of all articles (anyone)
* Article page: view article details and publish date (anyone)
* Admin dashboard: list, edit, delete, or add new articles (admin only)
* Add/Edit article: forms for title, content, and date
* Simple authentication for admin section
* No database required — articles are stored as files (JSON or Markdown)

---

## 📁 Project Structure Example

```
/
├── articles/
│   ├── 1.md
│   ├── 2.md
│   └── ...
├── public/
│   ├── home.html
│   ├── article.html
│   ├── admin.html
│   ├── edit.html
│   ├── new.html
│   └── ...
├── articles.json
├── server.js
└── README.md
```

---

## 🛠️ How to Run

1. Clone the repo
2. Run the backend server (Node.js, Python, etc.)
3. Visit `/` for the public blog, `/admin` for the admin dashboard (login required)
4. Files are stored in `/articles/` as JSON or Markdown

---

## 🔒 Authentication

* Use a simple login form or hardcoded credentials for admin access
* Sessions/cookies can be used for basic authentication

---

## 💡 What you'll practice

* File I/O (read/write articles)
* Routing and HTML templating
* Form handling (add/edit/delete)
* Basic authentication
* HTML & CSS layout

---

## ✨ Extending the Project

* Add comments, categories, or tags
* Search or filter articles
* Improve authentication/security
* Switch to a real database
* Build a REST API

---

## 🌠 Inspired by

[roadmap.sh Personal Blog Challenge](https://roadmap.sh/projects/personal-blog)
