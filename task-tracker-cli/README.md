 # Task Tracker CLI
https://roadmap.sh/projects/task-tracker
A simple command-line task tracker built with Node.js.

This project allows users to create, update, delete, and manage tasks directly from the terminal while storing all task data in a local JSON file.

The project was built without external libraries to practice:
- CLI development
- filesystem operations
- JSON handling
- input validation
- modular backend architecture

---

# Features

- Add tasks
- Update tasks
- Delete tasks
- Mark tasks as:
  - todo
  - in-progress
  - done
- List all tasks
- Filter tasks by status
- Persistent JSON storage
- Input validation and error handling
- Automatic task file creation

---

# Project Structure

```text
task-tracker-cli/
│
├── src/
│   ├── index.js
│   └── taskManager.js
│
├── .gitignore
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/Phuc1Le/Backend-Projects.git
```

Navigate into the project:

```bash
cd Backend-Projects/task-tracker-cli
```

Install Node.js if not already installed:

https://nodejs.org

---

# Usage

Run commands using:

```bash
npm start <command>
```

---

# Commands

## Add a task

```bash
npm start add "Buy groceries"
```

Example output:

```text
Task added successfully (ID: 1)
```

---

## Update a task

```bash
npm start 1 "Buy groceries and cook dinner"
```

---

## Delete a task

```bash
npm start delete 1
```

---

## Mark task as in progress

```bash
npm start mark-in-progress 1
```

---

## Mark task as done

```bash
npm start mark-done 1
```

---

## List all tasks

```bash
npm start list
```

---

## List tasks by status

### Done tasks

```bash
npm start list done
```

### Todo tasks

```bash
npm start list todo
```

### In-progress tasks

```bash
npm start list in-progress
```

---

# Task Format

Tasks are stored in a JSON file with the following structure:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2026-05-17T12:00:00.000Z",
  "updatedAt": "2026-05-17T12:00:00.000Z"
}
```

---

# Error Handling

The application handles:
- missing task descriptions
- invalid task IDs
- invalid statuses
- unknown commands
- missing task storage file
- malformed JSON data

---

# Technologies Used

- JavaScript
- Node.js
- Native `fs` module
- Native `path` module

No external libraries or frameworks were used.

---

# Learning Goals

This project was built to practice backend fundamentals including:
- command-line interfaces
- modular code organization
- persistent storage
- CRUD operations
- validation and defensive programming
- Git and GitHub workflows

---

# Future Improvements

Possible future enhancements:
- command aliases
- task priorities
- due dates
- search functionality
- sorting and pagination
- interactive terminal UI
- migration to SQLite or MongoDB

---

# License

This project is open source and available under the MIT License.