# EventVault-Pro

Enterprise Role-Based Event Management Platform built using the MERN Stack, JWT Authentication, Redux Toolkit, Cloudinary, Docker, and MongoDB Atlas.

## Overview

EventVault-Pro is a production-oriented Event Management System designed to streamline event creation, approval workflows, user management, and activity tracking through a secure Role-Based Access Control (RBAC) architecture.

The platform provides dedicated workflows for Administrators, Managers, and Viewers while maintaining complete audit trails, analytics, and secure authentication mechanisms.

---

## Features

### Authentication & Security

* JWT Authentication
* Secure Password Hashing using bcrypt
* Forgot Password Functionality
* Reset Password via Email
* Role-Based Access Control (RBAC)
* Protected API Routes
* Secure Environment Variable Management

### Event Management

* Create Events
* Update Events
* Delete Events
* View Event Details
* Event Approval Workflow
* Event Search
* Event Filtering
* Pagination Support

### User Management

* Create Users
* Manage User Roles
* View User Profiles
* Search and Filter Users
* Role Assignment (Admin, Manager, Viewer)

### Activity Logging

* Event Creation Logs
* Event Update Logs
* Event Approval Logs
* Event Deletion Logs
* User Activity Tracking
* Audit Trail System

### Analytics

* Total Events
* Approved Events
* Pending Events
* Total Users
* Activity Insights

### Media Management

* Cloudinary Integration
* Event Banner Uploads
* Gallery Image Support

### Frontend

* React + Vite
* Redux Toolkit
* React Router DOM
* Axios Integration
* Responsive UI
* Glassmorphism Design
* Animated SaaS Login Experience

### DevOps

* Dockerized Frontend
* Dockerized Backend
* Docker Compose Configuration
* MongoDB Atlas Integration

---

## Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Axios
* React Icons
* React Hot Toast
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Nodemailer
* Cloudinary
* Multer

### Database

* MongoDB Atlas

### DevOps

* Docker
* Docker Compose
* Git
* GitHub

---

## System Architecture

Client (React + Redux)
↓
REST API (Express.js)
↓
Authentication Layer (JWT)
↓
RBAC Middleware
↓
MongoDB Atlas

Additional Services:

* Cloudinary (Media Storage)
* Nodemailer (Email Service)

---

## User Roles

### Admin

* Full System Access
* Manage Users
* Approve Events
* View Analytics
* Monitor Activity Logs

### Manager

* Create Events
* Edit Events
* Manage Assigned Operations

### Viewer

* Read-Only Access
* View Events
* View Approved Content

---

## Project Structure

```text
EventVault-Pro
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── app
│   │   ├── components
│   │   ├── features
│   │   ├── pages
│   │   ├── routes
│   │   └── assets
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── config
│
├── docker-compose.yml
│
└── README.md
```

## Environment Variables

### Backend

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_app_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/EventVault-Pro.git

cd EventVault-Pro
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## Docker Setup

### Build Containers

```bash
docker compose build
```

### Start Containers

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

---

## API Modules

### Authentication

* Register User
* Login User
* Forgot Password
* Reset Password

### Events

* Create Event
* Get Events
* Get Event By ID
* Update Event
* Delete Event
* Approve Event

### Users

* Create User
* View Users
* Update User Role
* Delete User

### Analytics

* Dashboard Analytics

### Activity Logs

* User Activity Tracking

---

## Security Features

* Password Hashing with bcrypt
* JWT Authentication
* Protected Routes
* Role-Based Authorization
* Environment Variable Protection
* Audit Logging

---

## Future Enhancements

* Admin Approval Workflow
* User Suspension System
* Dark Mode
* Recharts Analytics Dashboard
* Real-Time Notifications
* Event Registration Module
* Calendar Integration
* Export Reports (PDF/Excel)
* CI/CD Pipeline

---

## Author

**Kartik Karnwal**

Final Year Computer Science Student

### Connect

* GitHub: https://github.com/KK-306
* LinkedIn: https://www.linkedin.com/in/kartik-karnwal-59b94828b/
---

## License

This project is developed for educational, learning, and portfolio purposes.
© 2026 Kartik Karnwal. All Rights Reserved.
