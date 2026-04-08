# SaaS Multi-Tenant Business Management Platform

A modern **SaaS platform for small and medium businesses (SMBs)** that enables companies to manage their operations from a single web system while keeping their data fully isolated.

This project demonstrates a **real multi-tenant architecture**, secure authentication, and a scalable full-stack implementation using **ASP.NET Core, React, and SQL Server**.

---

# 🚀 Overview

Many small businesses still rely on spreadsheets or cannot afford expensive ERP systems.
This platform provides an **affordable, cloud-based solution** where multiple companies can operate independently within the same system.

Each company:

* Has its **own users**
* Manages **its own products, clients, and sales**
* Sees **only its own data**
* Operates in a **secure multi-tenant environment**

---

# 🧠 Problem It Solves

Small and medium businesses often struggle with:

* Managing sales and inventory
* Tracking customers
* Generating simple business metrics
* Paying for expensive ERP software

This platform offers a **lightweight SaaS alternative** focused on simplicity and clarity.

---

# 🥇 Core Concept: Multi-Tenant SaaS

The system is designed so that **multiple companies share the same infrastructure**, but their data remains completely isolated.

Each company is treated as a **tenant**.

Key principles:

* Shared application
* Isolated business data
* Tenant-aware backend
* Role-based access control

---

# 🏗 Main Features

## 1️⃣ Company Registration

A business can create an account providing:

* Company name
* Email
* Subscription plan (Free / Pro)
* Administrator user

Once registered, the system creates:

* A **Company entity**
* An **Admin user**
* A **tenant-isolated environment**

---

## 👥 User Management

Each company can manage its own team.

Features:

* Create users
* Assign roles

Roles supported:

* **Admin**
* **Sales**
* **Supervisor**

---

## 📦 Product Management

* Create products
* Set prices
* Manage stock levels
* Activate or deactivate products

---

## 🧾 Customer Management

* Customer registration
* Purchase history tracking

---

## 💰 Sales Management

* Associate customers with sales
* Add products to the sale
* Automatic stock deduction
* Record transaction details

---

## 📊 Dashboard & Metrics

* Total sales of the month
* Best selling product
* Daily sales metrics
* Accumulated revenue

---

# 🧱 Technical Architecture

## Backend

* ASP.NET Core Web API
* JWT Authentication
* Global Error Handling Middleware
* Multi-Tenant architecture using CompanyId
* Repository Pattern / Clean Architecture
* SQL Server

Responsibilities:

* Authentication & authorization
* Business logic
* Tenant isolation
* Data persistence

---

## Frontend

* React (Vite)
* React Router (Protected Routes + Outlet)
* Axios with interceptors
* JWT authentication flow
* Modular CRUD interfaces

---

## 📐 Architecture Diagram

<!-- TODO: Add architecture diagram -->

<!-- Suggested:
Frontend → API → Services → Database (with CompanyId filtering)
-->

---

# 🧠 Technical Decisions

### 1. Multi-Tenant via CompanyId

Tenant isolation is handled at the application level using a CompanyId filter across all entities.

### 2. JWT Authentication

A stateless authentication approach was implemented for scalability and simplicity.

### 3. Protected Routes

Frontend route protection ensures only authenticated users can access the system.

### 4. Layout with Nested Routing

React Router `Outlet` avoids layout duplication and improves maintainability.

### 5. Service Layer (Frontend)

API calls are abstracted into services to decouple UI from backend logic.

---

# ⚖️ Trade-offs

* Single database multi-tenant instead of database-per-tenant
* Local state instead of global state management
* No caching layer

These decisions prioritize **simplicity and fast iteration**.

---

# 🔄 Key Flows

## Authentication Flow

1. User logs in
2. Backend validates credentials
3. JWT token is returned
4. Token is stored in browser
5. Protected routes allow access

## Sales Flow

1. User selects a client
2. Adds products
3. Calculates total
4. Sends request to API
5. Backend processes and stores the sale

---

# 📸 Screenshots

<!-- TODO: Add screenshots -->

<!-- Suggested:
- Login
- Dashboard
- Products
- Sales
-->

---

# 📂 Project Structure (Conceptual)

## Backend

/Backend
/Controllers
/Services
/Repositories
/Entities
/DTOs
/Middleware

## Frontend

/Frontend
/components
/pages
/services
/hooks
/layouts

---

# ⚙️ Setup & Installation

## Backend

cd Backend
dotnet restore
dotnet run

## Frontend

cd Frontend
npm install
npm run dev

<!-- TODO: Add .env variables if needed -->

---

# 🔐 Security

* JWT authentication
* Role-based authorization
* Tenant data isolation
* Protected API endpoints

---

# 🚀 Future Improvements

* Subscription billing
* Advanced analytics
* Audit logs
* Email notifications
* Multi-language support
* Docker & CI/CD

---

# 📜 License

<!-- TODO: Add license (MIT recommended) -->
