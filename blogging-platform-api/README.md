# 🚀 Blogging Platform API

Build a simple, robust RESTful API for a personal blogging platform. This project will guide you through designing endpoints, working with HTTP methods, status codes, validation, and CRUD operations—foundations of modern web development!

---

## 🌌 Project Goals

* Understand what RESTful APIs are (including best practices and conventions).
* Learn how to create a RESTful API from scratch.
* Work with common HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
* Learn about status codes and error handling in APIs.
* Perform CRUD operations via HTTP endpoints.
* Practice filtering resources with search parameters.
* Work with a database to persist blog posts.

---

## 📚 Features

Your API should allow users to:

* **Create** a new blog post
* **Update** an existing blog post
* **Delete** an existing blog post
* **Get** a single blog post
* **Get** all blog posts
* **Filter** blog posts by a search term

---

## 🌱 Blog Post Structure

Each blog post should have:

```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

---

## 🛣️ API Endpoints & Usage

### Create a Blog Post

**POST** `/posts`

* Request body:

  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content...",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }
  ```
* Response: `201 Created`

  * Returns the created post, with auto-generated `id`, `createdAt`, `updatedAt`.
* On validation error: `400 Bad Request` with errors.

---

### Update a Blog Post

**PUT** `/posts/:id`

* Request body: (same as create)
* Response: `200 OK` with updated post.
* If not found: `404 Not Found`
* On validation error: `400 Bad Request` with errors.

---

### Delete a Blog Post

**DELETE** `/posts/:id`

* Response: `204 No Content` if deleted.
* If not found: `404 Not Found`.

---

### Get a Single Blog Post

**GET** `/posts/:id`

* Response: `200 OK` with the post.
* If not found: `404 Not Found`.

---

### Get All Blog Posts

**GET** `/posts`

* Response: `200 OK` with array of posts.

---

### Filter Blog Posts by Search Term

**GET** `/posts?term=tech`

* Returns posts where the term appears in the `title`, `content`, or `category`.

---

## 🧑‍💻 Example

#### Create

```http
POST /posts
Content-Type: application/json

{
  "title": "API Design",
  "content": "Best practices for RESTful APIs.",
  "category": "Tech",
  "tags": ["API", "REST"]
}
```

#### Filter

```http
GET /posts?term=tech
```

---

## 🏗️ Implementation Tips

* You can use any backend framework (e.g., Express.js for Node, Flask for Python).
* Use a simple database (SQLite, MongoDB, Postgres, or even a JSON file for learning).
* Validate request bodies and handle errors gracefully.
* Use meaningful HTTP status codes for every response.
* No need for authentication, pagination, or advanced features—focus on CRUD and REST conventions.

---

## 🌠 Why Do It This Way?

> "If you wish to make an apple pie from scratch, you must first invent the universe."
> — Carl Sagan

In a similar way, learning how to build a clean REST API is inventing the universe of backend development.
You’ll learn not just how, but **why** modern web APIs work the way they do.

---

**Happy coding! If you get stuck, take a cosmic perspective—every great developer started with small, well-crafted projects like this one.**
