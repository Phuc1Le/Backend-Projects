https://roadmap.sh/projects/blogging-platform-api
# Blogging Platform API

A RESTful API for a personal blogging platform built with **Node.js**, **Express.js**, and **PostgreSQL**.

This project implements the core CRUD operations for blog posts and supports filtering posts by a search term.

---

## Features

- Create a blog post
- Retrieve all blog posts
- Retrieve a single blog post by ID
- Update an existing blog post
- Delete a blog post
- Search blog posts by title, content, or category
- PostgreSQL database integration
- Layered architecture (Routes → Controllers → Models)

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL driver)
- dotenv

---

## Project Structure

```text
blog-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── postController.js
│
├── models/
│   └── postModel.js
│
├── routes/
│   └── postRoutes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

### Folder Responsibilities

| Folder/File | Purpose |
|------------|---------|
| `app.js` | Application entry point. Configures Express, middleware, routes, and starts the server. |
| `config/db.js` | Creates and exports the PostgreSQL connection pool. |
| `routes/` | Defines API endpoints and maps them to controller functions. |
| `controllers/` | Handles HTTP requests and responses. |
| `models/` | Executes SQL queries and interacts with PostgreSQL. |
| `.env` | Stores environment variables and database credentials. |

---

## Database Setup

### Create Database

Open PostgreSQL and run:

```sql
CREATE DATABASE blog_api;
```

Connect to the database:

```sql
\c blog_api
```

### Create Table

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd blog-api
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_USER=postgres
DB_HOST=localhost
DB_NAME=blog_api
DB_PASSWORD=your_password
DB_PORT=5432
```

Replace `your_password` with your PostgreSQL password.

---

## Running the Application

Start the server:

```bash
node app.js
```

Expected output:

```text
Server running on port 3000
```

The API will be available at:

```text
http://localhost:3000
```

---

## API Endpoints

### Get All Posts

```http
GET /posts
```

#### Response

```json
[
  {
    "id": 1,
    "title": "Learning Node",
    "content": "Introduction to Node.js",
    "category": "Programming",
    "created_at": "2026-06-02T10:00:00.000Z",
    "updated_at": "2026-06-02T10:00:00.000Z"
  }
]
```

---

### Get Single Post

```http
GET /posts/:id
```

Example:

```http
GET /posts/1
```

#### Success Response

```json
{
  "id": 1,
  "title": "Learning Node",
  "content": "Introduction to Node.js",
  "category": "Programming"
}
```

#### Error Response

```http
404 Not Found
```

```json
{
  "message": "Post not found"
}
```

---

### Create Post

```http
POST /posts
```

#### Request Body

```json
{
  "title": "My First Blog Post",
  "content": "This is my first article.",
  "category": "Technology"
}
```

#### Success Response

```http
201 Created
```

```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is my first article.",
  "category": "Technology"
}
```

---

### Update Post

```http
PUT /posts/:id
```

Example:

```http
PUT /posts/1
```

#### Request Body

```json
{
  "title": "Updated Title",
  "content": "Updated Content",
  "category": "Programming"
}
```

#### Success Response

```http
200 OK
```

```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated Content",
  "category": "Programming"
}
```

---

### Delete Post

```http
DELETE /posts/:id
```

Example:

```http
DELETE /posts/1
```

#### Success Response

```http
204 No Content
```

---

### Search Posts

```http
GET /posts?term=tech
```

Searches across:

- Title
- Content
- Category

#### Example

```http
GET /posts?term=node
```

#### Response

```json
[
  {
    "id": 1,
    "title": "Learning Node",
    "content": "Introduction to Node.js",
    "category": "Programming"
  }
]
```

---

## Testing

The API can be tested using:

- Browser (GET requests)
- VS Code REST Client extension
- Thunder Client
- Postman
- curl

Example:

```http
GET http://localhost:3000/posts
```

```http
POST http://localhost:3000/posts
Content-Type: application/json

{
  "title": "Learning APIs",
  "content": "Hello World",
  "category": "Technology"
}
```

---

## Architecture

The application follows a layered architecture:

```text
HTTP Request
    ↓
Routes
    ↓
Controllers
    ↓
Models
    ↓
PostgreSQL
```

### Routes

Define available endpoints.

### Controllers

Handle request validation and HTTP responses.

### Models

Execute SQL queries and interact with PostgreSQL.

### Database

Stores application data.

This separation improves maintainability and keeps responsibilities clearly defined.

---

## Future Improvements

Possible enhancements include:

- JWT Authentication
- User accounts
- Pagination
- Sorting and filtering
- Categories and tags tables
- Database migrations
- Docker support
- Unit and integration testing
- Centralized error handling
- Request validation middleware

---

## Learning Objectives

This project demonstrates:

- RESTful API design
- CRUD operations
- Express routing
- Controller/Model architecture
- PostgreSQL integration
- SQL parameterization
- HTTP status codes
- Error handling
- Environment configuration

---