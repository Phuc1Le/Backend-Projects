# Todo API with Docker, Terraform, and Ansible

A simple RESTful Todo API built with **Node.js**, **Express**, and **MongoDB**. This project demonstrates containerization with Docker, infrastructure provisioning with Terraform, and server configuration using Ansible.

## Features

* CRUD REST API for managing todos
* MongoDB persistence with Docker volumes
* Docker Compose for local development
* AWS EC2 infrastructure provisioned with Terraform
* Automated server configuration and deployment using Ansible

## Tech Stack

* Node.js
* Express
* MongoDB
* Mongoose
* Docker & Docker Compose
* Terraform
* Ansible
* AWS EC2

## Local Development

Start the API and MongoDB containers:

```bash
docker compose up --build
```

The API will be available at:

```
http://localhost:3000
```

Data is persisted using a Docker named volume.

## Remote Deployment

### Provision Infrastructure

Create an EC2 instance using Terraform:

```bash
cd terraform
terraform init
terraform apply
```

### Configure the Server

Install the required Ansible role:

```bash
cd ansible
ansible-galaxy install -r requirements.yml
```

Update `inventory.ini` with your EC2 instance information, then deploy:

```bash
ansible-playbook -i inventory.ini deploy.yml
```

The playbook will:

* Install Docker and Docker Compose
* Create the application directory
* Copy the production Docker Compose file
* Pull the API image from Docker Hub
* Start the API and MongoDB containers

## Project Structure

```
.
├── ansible/
├── terraform/
├── models/
├── routes/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── database.js
└── index.js
```

## Status

* ✅ Requirement #1 — Dockerized API with Docker Compose and persistent MongoDB storage
* ✅ Requirement #2 — AWS EC2 provisioning with Terraform and automated deployment using Ansible
* ⏳ Requirement #3 — CI/CD pipeline with GitHub Actions
