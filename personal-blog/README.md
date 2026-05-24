# Personal Blog Platform
https://roadmap.sh/projects/personal-blog
A full-stack personal blog application built with Node.js, Express, EJS, and filesystem-based storage.

This project includes:
- Public blog pages
- Admin dashboard
- Article creation/editing/deletion
- Authentication with sessions
- Server-side rendering using EJS
- Persistent article storage using JSON files
- Modern responsive styling using plain CSS

---

# Features

## Public Pages

- View all published articles
- Read individual articles
- Articles sorted by latest modification date

## Admin Pages

- Admin login system
- Protected dashboard
- Create new articles
- Edit existing articles
- Delete articles
- Session-based authentication

---

# Technologies Used

- Node.js
- Express.js
- EJS
- express-session
- dotenv
- HTML/CSS
- Native filesystem (`fs` module)

---

# Project Structure

```text
personal-blog/
│
├── src/
│   ├── public/
│   │   └── style.css
│   │
│   ├── views/
│   │   ├── home.ejs
│   │   ├── article.ejs
│   │   ├── dashboard.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── login.ejs
│   │
│   ├── articles/
│   │
│   ├── utils/
│   │   └── articleManager.js
│   │
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone <repository-url>
cd personal-blog
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment Variables

Create a `.env` file in the root directory:

```env
SESSION_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123
```

You can also copy from:

```bash
cp .env.example .env
```

---

# Running the Application

```bash
npm start
```

Server runs at:

```text
http://localhost:3000
```

---

# Authentication

The admin section is protected using session-based authentication.

## Login Route

```text
/login
```

## Protected Routes

- `/admin`
- `/new`
- `/edit/:id`
- `/delete/:id`

After successful login:
- a session is created
- the browser stores a session cookie
- protected routes become accessible

Logout destroys the session and removes admin access.

---

# How Authentication Works

This project uses:
- `express-session`
- cookie-based sessions

## Flow

### Login
1. User submits username/password
2. Server validates credentials
3. Session is created:

```js
req.session.isAdmin = true;
```

4. Browser receives session cookie

### Auth Middleware

Protected routes use middleware:

```js
const requireAuth = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect("/login");
    }

    next();
};
```

This ensures only authenticated users can access admin pages.

---

# How Article Storage Works

Articles are stored as JSON files inside:

```text
src/articles/
```

Each article contains:

```json
{
  "id": 1,
  "title": "My Article",
  "content": "Article content...",
  "createdAt": "...",
  "lastModifiedAt": "..."
}
```

---

# Filesystem-Based Database

Instead of using MongoDB or PostgreSQL, this project uses the native Node.js filesystem module:

```js
const fs = require("fs");
```

Operations include:
- `fs.writeFileSync()` → create/update
- `fs.readFileSync()` → read
- `fs.unlinkSync()` → delete

This project demonstrates backend CRUD architecture without using a database.

---

# Server-Side Rendering with EJS

The frontend uses EJS templates.

Example:

```ejs
<h1><%= article.title %></h1>
```

The server dynamically injects data into HTML before sending it to the browser.

This allows:
- dynamic pages
- reusable templates
- server-rendered content

without React or frontend frameworks.

---

# Styling

The project uses:
- plain CSS
- reusable UI components
- responsive layouts
- article cards
- modern spacing/shadow systems

No frontend framework or CSS library is used.

---

# CRUD Operations

The blog supports full CRUD functionality.

| Operation | Feature |
|---|---|
| Create | New article |
| Read | View articles |
| Update | Edit article |
| Delete | Remove article |

---

# Environment Variables

| Variable | Purpose |
|---|---|
| `SESSION_SECRET` | Session cookie signing |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |

---

# Future Improvements

Potential future upgrades:
- Markdown support
- Rich text editor
- Database integration
- User accounts
- Password hashing
- Image uploads
- Tags/categories
- Search functionality
- Pagination
- Dark mode
- Deployment

---

# Learning Goals

This project was built to practice:
- Express routing
- Middleware
- Sessions/authentication
- Filesystem operations
- CRUD architecture
- EJS templating
- Server-side rendering
- Form handling
- CSS layout systems
- Backend project structure

---

# License

This project is for educational purposes.