# Expense Tracker API

A RESTful API for managing personal expenses. Users can register, log in, and manage their own expenses using JWT-based authentication.

## Features

### Authentication

- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected expense routes

### Expense Management

- Create an expense
- View all expenses belonging to the authenticated user
- Update an expense
- Delete an expense

### Expense Filtering

Filter expenses by:

- Past day
- Past week
- Past month
- Past 3 months
- Custom date range (`startDate` and `endDate`)

### Security

- Passwords are hashed before storage
- JWT authentication middleware
- Users can only access their own expenses
- Ownership validation on update and delete operations

---

# Tech Stack

- Node.js
- Express.js
- PostgreSQL
- bcrypt
- JSON Web Tokens (JWT)
- dotenv

---

# Project Structure

```text
expense-tracker-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── expenseController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── expenseModel.js
│
├── routes/
│   ├── authRoutes.js
│   └── expenseRoutes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

# Database Schema

## Users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Expenses

```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Installation

## Clone the repository

```bash
git clone <repository-url>
cd expense-tracker-api
```

## Install dependencies

```bash
npm install
```

## Create environment variables

Create a `.env` file:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=expense_tracker

JWT_SECRET=your_super_secret_key
```

## Create PostgreSQL database

```sql
CREATE DATABASE expense_tracker;
```

Create the tables using the schema above.

## Start the server

```bash
npm run dev
```

or

```bash
node app.js
```

---

# API Endpoints

## Authentication

### Register

```http
POST /auth/register
```

Request:

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

Response:

```json
{
    "message": "User registered successfully"
}
```

---

### Login

```http
POST /auth/login
```

Request:

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

Response:

```json
{
    "token": "jwt_token"
}
```

---

# Protected Routes

All expense routes require:

```http
Authorization: Bearer <jwt_token>
```

---

## Create Expense

```http
POST /expenses
```

Request:

```json
{
    "amount": 50.25,
    "description": "Weekly groceries",
    "category": "Groceries",
    "expense_date": "2026-06-05"
}
```

Response:

```json
{
    "id": 1,
    "user_id": 1,
    "amount": "50.25",
    "description": "Weekly groceries",
    "category": "Groceries",
    "expense_date": "2026-06-05"
}
```

---

## Get All Expenses

```http
GET /expenses
```

Response:

```json
[
    {
        "id": 1,
        "amount": "50.25",
        "description": "Weekly groceries",
        "category": "Groceries",
        "expense_date": "2026-06-05"
    }
]
```

---

## Update Expense

```http
PUT /expenses/:id
```

Request:

```json
{
    "amount": 75,
    "description": "Updated groceries",
    "category": "Groceries",
    "expense_date": "2026-06-05"
}
```

Response:

```json
{
    "id": 1,
    "amount": "75.00",
    "description": "Updated groceries",
    "category": "Groceries",
    "expense_date": "2026-06-05"
}
```

---

## Delete Expense

```http
DELETE /expenses/:id
```

Response:

```http
204 No Content
```

---

# Expense Filtering

## Past Day

```http
GET /expenses?period=day
```

## Past Week

```http
GET /expenses?period=week
```

## Past Month

```http
GET /expenses?period=month
```

## Past 3 Months

```http
GET /expenses?period=3months
```

## Custom Date Range

```http
GET /expenses?startDate=2026-01-01&endDate=2026-03-31
```

---

# Authentication Flow

```text
User Registers
       │
       ▼
Password Hashed
       │
       ▼
Stored in Database
       │
       ▼
User Logs In
       │
       ▼
JWT Generated
       │
       ▼
Client Stores JWT
       │
       ▼
JWT Sent In Authorization Header
       │
       ▼
Middleware Verifies JWT
       │
       ▼
Protected Route Access Granted
```

---

# Learning Objectives

This project demonstrates:

- REST API design
- Express.js routing and middleware
- PostgreSQL integration
- JWT authentication
- Password hashing with bcrypt
- CRUD operations
- Foreign key relationships
- Dynamic SQL query construction
- Authorization and ownership validation
- Environment variable management

---

# Future Improvements

- Request validation with Joi or Zod
- Refresh token authentication
- Pagination
- Expense statistics endpoint
- Category validation
- Automated tests with Jest
- Docker support
- API documentation with Swagger
- Rate limiting
- Logging and monitoring

---

# License

This project is for educational purposes and was built as part of a backend development learning roadmap.