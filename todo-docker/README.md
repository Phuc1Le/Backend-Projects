# Todo API with Docker, Terraform, Ansible, and CI/CD

A simple RESTful Todo API built with **Node.js**, **Express**, and **MongoDB**. This project demonstrates containerization with Docker, infrastructure provisioning with Terraform, server configuration using Ansible, automated deployments with GitHub Actions, and reverse proxying with Nginx.

## Features

- CRUD REST API for managing todos
- MongoDB persistence with Docker named volumes
- Docker Compose for local development
- AWS EC2 infrastructure provisioned with Terraform
- Automated server configuration using Ansible
- CI/CD pipeline with GitHub Actions
- Nginx reverse proxy for production deployment

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Docker & Docker Compose
- Docker Hub
- Terraform
- Ansible
- GitHub Actions
- Nginx
- AWS EC2

## Local Development

Start the API and MongoDB containers:

```bash
docker compose up --build
```

The API will be available at:

```
http://localhost:3000
```

MongoDB data is persisted using a Docker named volume.

## Production Deployment

### 1. Provision Infrastructure

Create the AWS infrastructure using Terraform:

```bash
cd terraform
terraform init
terraform apply
```

This provisions:

- EC2 instance
- Security Group
- Elastic IP

### 2. Configure the Server

Install the required Ansible role:

```bash
cd ansible
ansible-galaxy role install geerlingguy.docker
```

Update `inventory.ini` with your EC2 Elastic IP, then deploy:

```bash
ansible-playbook -i inventory.ini deploy.yml
```

The playbook will:

- Install Docker and Docker Compose
- Create the application directory
- Copy the production Docker Compose and Nginx configuration
- Pull the Docker images from Docker Hub
- Start the API, MongoDB, and Nginx containers

The production API is accessible through the Nginx reverse proxy:

```
http://<EC2_ELASTIC_IP>/todos
```

## Continuous Deployment

GitHub Actions automatically deploys the application whenever changes are pushed to the `main` branch.

The deployment workflow:

1. Build the Docker image
2. Push the image to Docker Hub
3. SSH into the EC2 instance
4. Pull the latest image
5. Restart the containers using Docker Compose

## Project Structure

```
.
├── .github/
│   └── workflows/
├── ansible/
├── nginx/
├── terraform/
├── models/
├── routes/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── database.js
├── index.js
└── package.json
```

## Architecture

```
Browser
    │
    ▼
Nginx (EC2)
    │
    ▼
Node.js API
    │
    ▼
MongoDB
```

Infrastructure is managed with Terraform, server configuration with Ansible, and application deployments with GitHub Actions.

## Status

- ✅ Requirement #1 — Dockerized API with Docker Compose and persistent MongoDB storage
- ✅ Requirement #2 — AWS infrastructure provisioned with Terraform and configured using Ansible
- ✅ Requirement #3 — Automated CI/CD deployment using GitHub Actions
- ✅ Bonus — Nginx reverse proxy for production access