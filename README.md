# Sweet Shop Management System – Backend

A complete backend application for managing a sweet shop using **Node.js, Express, and MongoDB**, developed strictly following **Test-Driven Development (TDD)** principles.

This system provides secure authentication, role-based authorization, sweets management, and inventory operations for a digital sweet shop.

## Project Overview

The Sweet Shop Management System allows:

- Users to register and login securely
- Customers to browse, search, and purchase sweets
- Admins to manage sweets inventory and restock items
- Enforcement of business rules like out-of-stock prevention

The entire backend is built with clean architecture and fully tested APIs.

## Features

### Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- Role-based access control (Admin / User)

### Sweets Management

- Add sweets (**Admin only**)
- View all sweets
- Search sweets by:
  - Name
  - Category
  - Price range

### Inventory Management

- Purchase sweets (quantity decreases)
- Prevent purchase when quantity is zero
- Restock sweets (**Admin only**)

### Engineering Quality

- Strict Test-Driven Development (TDD)
- Unit & integration tests with Jest and Supertest
- Real MongoDB database (no in-memory mocks)
- Clean, modular, maintainable codebase

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Testing:** Jest, Supertest
- **Version Control:** Git

## 📁 Project Structure

```
src/
 ├── app.js
 ├── server.js
 ├── config/
 │   └── db.js
 ├── controllers/
 │   ├── auth.controller.js
 │   └── sweets.controller.js
 ├── middleware/
 │   ├── auth.middleware.js
 │   └── role.middleware.js
 ├── models/
 │   ├── User.js
 │   └── Sweet.js
 ├── routes/
 │   ├── auth.routes.js
 │   └── sweets.routes.js
 └── tests/
     ├── auth.login.test.js
     ├── auth.register.test.js
     ├── auth.middleware.test.js
     ├── sweets.create.test.js
     ├── sweets.read.test.js
     ├── sweets.search.test.js
     ├── sweets.purchase.test.js
     ├── sweets.restock.test.js
     ├── sweets.outofstock.test.js
     ├── sweets.validation.test.js
     └── sweets.admin.test.js
```

## API Endpoints

### Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

### Sweets (Protected Routes)

| Method | Endpoint                   | Access        |
| ------ | -------------------------- | ------------- |
| POST   | `/api/sweets`              | Admin         |
| GET    | `/api/sweets`              | Authenticated |
| GET    | `/api/sweets/search`       | Authenticated |
| POST   | `/api/sweets/:id/purchase` | Authenticated |
| POST   | `/api/sweets/:id/restock`  | Admin         |

## Testing Strategy

This project strictly follows **TDD (Red → Green → Refactor)**.

### Test Coverage Includes:

- Authentication flows
- Authorization & middleware
- CRUD operations
- Inventory edge cases
- Validation & error handling

### Run Tests

```bash
npm test
```

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/sweet-shop-backend.git
cd sweet-shop-backend
```

2️.) Install Dependencies

```bash
npm install
```

3️.) Environment Variables

Create a .env file in the root directory:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/sweet_shop
JWT_SECRET=your_jwt_secret
```

4️.) Start Server

```bash
npm run dev
```

Server runs on: http://localhost:5000

## 🤖 AI Usage Disclosure

This project was developed with assistance from **ChatGPT**.

### AI was used for:

1. Generating boilerplate code
2. Assisting with test case structure
3. Debugging and resolving issues during development

### Manually handled:

1. Overall architecture and design decisions
2. Complete Test-Driven Development (TDD) workflow
3. Business logic and validations
4. Role-based access control
5. Code refactoring and final review

All generated code was reviewed, modified, and finalized manually.
