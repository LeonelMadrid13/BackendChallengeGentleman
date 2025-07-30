# Expense Tracker API

## 📌 Overview

The **Expense Tracker API** is a RESTful backend service that allows users to manage their personal expenses. Each user has a private account with full CRUD capabilities for expense items and JWT-based authentication to secure endpoints.

![Expense Tracker API](https://assets.roadmap.sh/guest/expense-tracker-api-m72p5.png)

---

## ✨ Features

* **User Authentication:**

  * Sign up as a new user
  * Login to receive a JWT token
  * Protect endpoints using JWT

* **Expense Management:**

  * Create a new expense
  * Read (list/filter) existing expenses
  * Update an expense
  * Delete an expense

* **Filtering Options:**

  * View expenses from:

    * Past week
    * Past month
    * Last 3 months
    * Custom range (start and end date)

* **Expense Categories:**

  * Groceries
  * Leisure
  * Electronics
  * Utilities
  * Clothing
  * Health
  * Others

---

## 🛠 Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Language       | JavaScript / TypeScript         |
| Runtime        | Node.js                         |
| Framework      | Express.js                      |
| Authentication | JWT                             |
| Database       | PostgreSQL / MongoDB (flexible) |
| ORM / ODM      | Prisma / Mongoose (optional)    |

---

## 🧱 Endpoints Summary

### 🔐 Auth

* `POST /auth/signup` – Register a new user
* `POST /auth/login` – Login and receive JWT

### 💸 Expenses

> All endpoints below are **protected** by JWT

* `GET /expenses` – List all user expenses (with filters)
* `GET /expenses/:id` – Get one expense by ID
* `POST /expenses` – Create a new expense
* `PUT /expenses/:id` – Update an expense
* `DELETE /expenses/:id` – Delete an expense

---

## ⚙️ Filters

* `GET /expenses?range=past-week`
* `GET /expenses?range=past-month`
* `GET /expenses?range=last-3-months`
* `GET /expenses?start=YYYY-MM-DD&end=YYYY-MM-DD`

---

## 🔒 Authentication

JWT tokens must be sent in the `Authorization` header:

```http
Authorization: Bearer <your_token_here>
```

---

## 📦 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/expense-tracker-api.git
cd expense-tracker-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up your `.env` file:

```env
PORT=3000
JWT_SECRET=your-secret-key
DATABASE_URL=your-db-url
```

4. Run the app:

```bash
npm run dev
```

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test the endpoints. Swagger/OpenAPI documentation may be added.

---

## 📄 License

MIT

---

## 🙋‍♂️ Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.
