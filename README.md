# Backend Projects

A collection of eight projects covering cloud deployment, API design, HTTP caching, web crawling, and command-line tooling. 

## 1. [Todo API with Automated AWS Deployment](./todo-docker)

A REST API for managing todos, deployed on AWS EC2. Docker Compose runs the Express API, MongoDB, and Nginx. Nginx forwards incoming HTTP requests to the API, and a named Docker volume preserves database data across container restarts.

Terraform provisions the AWS infrastructure, and Ansible configures the server. Each push to `main` triggers GitHub Actions to build and publish a Docker image, connect to EC2 over SSH, and deploy the new image with Docker Compose.

**Stack** · Node.js, Express, MongoDB, Mongoose, Docker Compose, Nginx, Terraform, Ansible, GitHub Actions, AWS EC2

## 2. [Expense Tracker API](./expense-tracker-api)

A REST API that lets users register, sign in, and manage their own expenses. Passwords are hashed with bcrypt, and authentication middleware verifies JWTs before requests reach the expense routes.

Expenses are associated with user accounts in PostgreSQL. The API scopes reads to the signed-in user and checks ownership before updates or deletions. Users can filter expenses by preset periods or supply a custom date range.

**Stack** · Node.js, Express, PostgreSQL, JWT, bcrypt

## 3. [Personal Blog Platform](./personal-blog)

A server-rendered blog with public article pages and a private publishing dashboard. Visitors can browse articles by most recent update and open each article on its own page.

Administrators sign in through a session-based login and use the dashboard to create, edit, and delete articles. The app renders views with EJS and stores article data in local JSON files.

**Stack** · Node.js, Express, EJS, express-session, CSS

## 4. [Caching Proxy](./caching_proxy)

An HTTP proxy that forwards GET requests to a configurable origin and caches responses in memory. The origin URL and listening port are supplied at startup, and cache entries expire after a configurable duration.

Cache keys distinguish requests by origin and query parameters so different requests can retain separate responses. An `X-Cache` header lets clients see whether a response came from the cache or was fetched from the origin.

**Stack** · Python, Flask, Requests

## 5. [Blogging Platform API](./blog-api)

A PostgreSQL-backed REST API for creating, retrieving, updating, and deleting blog posts. Clients can fetch a post by ID or search across titles, content, and categories using the `term` query parameter.

The API separates route definitions, request handling, and database access into routes, controllers, and models. Database operations use parameterized SQL queries.

**Stack** · Node.js, Express, PostgreSQL, node-postgres

## 6. [Web Crawler](./web-crawler)

A command-line crawler that starts from a supplied URL and recursively follows links within the same domain. It parses HTML with jsdom, extracts links from anchor tags, and resolves relative URLs against the page address.

The crawler normalizes URLs to avoid fetching equivalent addresses twice. It skips external domains and non-HTML responses and handles invalid URLs, HTTP errors, and failed requests.

**Stack** · Node.js, jsdom, Fetch API

## 7. [GitHub Activity CLI](./github-activity-cli)

A terminal tool that takes a GitHub username and displays the account’s recent public activity. It fetches events from the GitHub REST API and formats pushes, pull requests, issues, stars, and forks into readable summaries.

The CLI handles invalid usernames, network failures, and unexpected API responses.

**Stack** · Node.js, GitHub REST API

## 8. [Task Tracker CLI](./task-tracker-cli)

A terminal tool for creating, updating, and deleting tasks. Users can move tasks between `todo`, `in-progress`, and `done`, list tasks by status, or delete all tasks in a given status.

Tasks persist in a local JSON file that the CLI creates on first use. Command parsing and task management are separated, and the tool uses Node.js built-ins for file operations and input handling.

**Stack** · Node.js
