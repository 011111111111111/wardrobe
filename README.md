# Digital Wardrobe Application

A full-stack web application for managing a personal digital wardrobe. The platform allows users to organize clothing items, create outfits, and track usage history through a responsive and modern interface.

---

## Features

* **Item Management**
  Add, edit, organize, and categorize clothing items. Images are securely stored and retrieved using AWS S3.

* **Outfit Creation**
  Combine clothing items to create, save, and plan outfits.

* **History Tracking**
  Track how frequently items are worn through detailed usage logs.

* **Real-time Updates**
  Live updates across the application using WebSockets (Socket.io).

* **User Interface**
  Responsive and accessible design built with Tailwind CSS, Shadcn UI, and Framer Motion.

* **Automated Infrastructure**
  End-to-end DevOps support for deployment and monitoring on AWS.

---

## Technology Stack

### Application Core

* **Frontend**
  Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI, Framer Motion, Zustand, React Hook Form

* **Backend**
  Custom Next.js Node server (tsx/nodemon), NextAuth.js for authentication, Socket.io for real-time communication

* **Database**
  MongoDB with Mongoose and Prisma ORM

* **Storage**
  AWS S3 for file and image storage

---

### DevOps and Infrastructure

* **Provisioning**
  Terraform (AWS EC2, S3, Security Groups, IAM)

* **Configuration Management**
  Ansible (OS setup, service configuration, deployment)

* **Monitoring**
  Nagios with NRPE (system metrics, uptime, database health)

---

## Project Structure

```text
wardrobe/
├── frontend/       # Next.js frontend application
├── backend/        # Backend services, APIs, and database logic
└── devops/         # Terraform, Ansible, and monitoring configurations
```

---

## Getting Started (Local Development)

### Prerequisites

* Node.js (v18 or higher)
* MongoDB (local instance or cloud)
* AWS account (for S3 configuration)

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and configure required variables such as:

* DATABASE_URL
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

Apply database schema (if using Prisma):

```bash
npm run db:push
```

Start the backend server:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file with required configuration.

Start the frontend server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

To run on a different port:

```bash
npm run front4001
```

---

## Deployment and Infrastructure

Production infrastructure is fully automated.

* Terraform provisions AWS resources
* Ansible configures servers and deploys services
* Nagios monitors system health and uptime

Refer to:

```
devops/README.md
```

for detailed setup and deployment instructions.

---

## Summary

This project demonstrates a complete full-stack application with integrated DevOps practices, including automated infrastructure provisioning, configuration management, real-time capabilities, and continuous monitoring.
