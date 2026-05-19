# GitHub Activity CLI

A simple command line interface (CLI) application built with Node.js that fetches and displays a GitHub user's recent public activity using the GitHub API.

## Features

- Fetch recent GitHub activity for any public user
- Display activity in a clean and readable format
- Handle invalid usernames gracefully
- Handle API and network errors
- Support multiple GitHub event types:
  - Push events
  - Issues
  - Stars
  - Forks
  - Repository creation
  - Pull requests
  - And more

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Phuc1Le/Backend-Projects.git
```

Navigate to the project folder:

```bash
cd Backend-Projects/github-activity-cli
```

Install dependencies:

```bash
npm install
```

---

## Usage

Run the application with:

```bash
npm start <github-username>
```

Example:

```bash
npm start kamranahmedse
```

Example output:

```text
- Pushed 3 commit(s) to kamranahmedse/developer-roadmap
- Opened an issue in kamranahmedse/developer-roadmap
- Starred kamranahmedse/developer-roadmap
- Forked kamranahmedse/developer-roadmap
```

---

## Project Structure

```text
github-activity-cli/
│
├── src/
│   ├── index.js
│   └── githubActivity.js
│
├── package.json
├── .gitignore
└── README.md
```

---

## Technologies Used

- Node.js
- JavaScript (ES6)
- GitHub REST API

---

## Error Handling

The application handles:
- Missing usernames
- Invalid GitHub usernames
- Empty activity lists
- API request failures
- Unexpected API responses

---

## API Endpoint

This project uses the following GitHub API endpoint:

```text
https://api.github.com/users/<username>/events
```

GitHub API Documentation:

https://docs.github.com/en/rest

---

## Learning Goals

This project was built to practice:
- Working with APIs
- Async/await in JavaScript
- Fetch requests
- JSON parsing
- CLI application development
- Error handling
- Git and GitHub workflow

---

## License

This project is open source and available under the MIT License.