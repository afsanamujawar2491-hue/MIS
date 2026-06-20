🔐 Authentication System — Full Stack Web Application
📌 Project Overview

The Authentication System is a full-stack web application built using Spring Boot (backend) and React (frontend).
It provides secure user authentication with features like registration, login, email verification, forgot password, and password reset using time-limited tokens.

The system is designed to demonstrate secure authentication workflows used in modern web applications.
💡 Proposed Solution

This project implements a secure authentication system using Spring Boot and React:

Users can:
Register securely
Verify email 
Login with encrypted passwords
Request password reset
Reset password using time-limited token
System ensures:
BCrypt password encryption
Token-based reset authentication
Expiry validation for reset tokens
Secure REST APIs
✨ Features
👤 User Module
User Registration
Secure Login
Password Encryption (BCrypt)
Forgot Password Flow
Password Reset via Token
Token Expiry Validation
Role-based Access (USER / ADMIN)
🔐 Security Features
Spring Security Integration
Password Hashing
Token-based Reset System
Input Validation
Secure REST APIs
🛠 Technology Stack
Layer	Technology
Frontend	React (Vite)
Backend	Spring Boot
Security	Spring Security
Database	MySQL
ORM	Spring Data JPA
API	REST APIs
Tools	Maven, npm, VS Code, Postman
⚙️ Setup & Usage Instructions
📁 Project Structure
auth-system/

├── backend/        # Spring Boot API (Port 8080)
├── frontend/       # React App (Port 5173)
└── README.md
🚀 Backend Setup
cd backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080
💻 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔌 API Endpoints
Auth APIs
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
GET  /api/auth/validate-reset-token?token=xxx
POST /api/auth/reset-password
🔐 Authentication Flow
1. Registration
User registers with email and password
Password stored using BCrypt encryption
2. Login
User logs in using credentials
3. Forgot Password
System generates reset token
Token stored with expiry time
Sent to user via email
4. Reset Password
User opens link:
http://localhost:5173/reset-password?token=xxx
Token is validated before allowing password reset
🗄️ Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
⚠️ Known Issues
Ensure backend and database use consistent timezone (recommended UTC)
Reset tokens expire after configured duration
CORS must be enabled for frontend-backend communication
👨‍💻 Author

Afsana Mujawar

Full Stack Developer
