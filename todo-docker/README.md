# Todo API with Docker, Terraform, Ansible, and CI/CD

> Deploying a backend service from local development to production using modern DevOps practices.

## Why

Building an API is only part of backend engineering. Deploying, configuring, and maintaining production infrastructure requires a different set of tools and workflows.

I built this project to learn the complete deployment lifecycle—from containerizing an application with Docker, provisioning cloud infrastructure with Terraform, configuring servers with Ansible, to automating deployments with GitHub Actions.

## What I Built

The project consists of a simple RESTful Todo API backed by MongoDB and deployed to AWS.

It demonstrates:

- Containerized application development with Docker
- Infrastructure provisioning using Terraform
- Automated server configuration with Ansible
- CI/CD deployments through GitHub Actions
- Production routing with Nginx

## Architecture
```text
                    Git Push
                       │
                       ▼
               GitHub Actions CI/CD
                       │
         Build & Push Docker Image
                       │
                       ▼
                  Docker Hub
                       │
                       ▼
                 AWS EC2 Instance
        (Provisioned with Terraform)
                       │
        Configured by Ansible Playbook
                       │
                       ▼
                  Docker Compose
               ┌────────┴────────┐
               ▼                 ▼
         Nginx Reverse Proxy   MongoDB
               │
               ▼
         Express REST API
```

### Infrastructure

- **Terraform** provisions the AWS infrastructure, including the EC2 instance, security group, and Elastic IP.
- **Ansible** configures the server by installing Docker, deploying configuration files, and starting application services.
- **Docker Compose** orchestrates the API, MongoDB, and Nginx containers.

### Application

- **Express.js** exposes a REST API for managing todo items.
- **MongoDB** stores application data using a persistent Docker volume.
- **Nginx** acts as a reverse proxy, forwarding incoming HTTP requests to the API container.

### Continuous Deployment

Every push to the `main` branch automatically:

1. Builds a new Docker image.
2. Pushes the image to Docker Hub.
3. Connects to the EC2 instance over SSH.
4. Pulls the latest image.
5. Restarts the containers with Docker Compose.

This creates a fully automated deployment pipeline where code changes can be deployed to production with a single Git push.

## Engineering Highlights

- Containerized the API and database with Docker Compose.
- Provisioned AWS infrastructure using Terraform.
- Automated server configuration with Ansible playbooks.
- Built a GitHub Actions pipeline for continuous deployment.
- Configured Nginx as a reverse proxy.

## What I Learned

This project helped me understand that deploying software involves much more than writing application code. Automating infrastructure with Terraform and Ansible made deployments repeatable and significantly reduced manual server configuration.

I also learned how containerization, reverse proxies, and CI/CD pipelines fit together to create a production deployment workflow similar to those used in industry.

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