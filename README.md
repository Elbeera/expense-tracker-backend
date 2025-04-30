# 🧾 Expense Tracker API

A modular, extensible **GraphQL API** built with **NestJS** and **TypeScript** to support personal and business expense tracking. Designed with clean architecture principles, the backend serves as a secure, scalable foundation for a future-facing frontend dashboard or mobile app.

---

## 📦 Tech Stack

| Layer    | Technology                     | Purpose                                              |
| -------- | ------------------------------ | ---------------------------------------------------- |
| Backend  | [NestJS](https://nestjs.com)   | Scalable Node.js framework with modular architecture |
| API      | [GraphQL](https://graphql.org) | Query-optimized API interface                        |
| Auth     | JWT (stateless)                | Secure token-based user authentication               |
| Language | TypeScript                     | Static typing and maintainable codebase              |
| Testing  | Jest                           | Unit testing and test-driven development             |

## 🔧 Features

- 🔐 **JWT Authentication**

  - Login and signup via GraphQL mutations
  - Secure access to user-specific resources
  - Custom guards and decorators for clean auth logic

- 💼 **Expense Management**

  - Full CRUD functionality via GraphQL
  - Expense ownership tied to authenticated users
  - Modular service/resolver architecture

- 👤 **User Management**

  - Lightweight user module for authentication and data access
  - Easily extendable to support profiles, preferences, and roles

- 🧪 **Testable Architecture**
  - Unit tests written for services and resolvers
  - Designed with maintainability and CI/CD pipelines in mind

---

## 🗂 Folder Structure

```
src/
├── main.ts                   # App bootstrap logic
├── app.module.ts             # Root module importing all features
├── schema.gql                # Auto-generated GraphQL schema
│
├── auth/                     # Authentication domain logic
│   ├── dto/                  # GraphQL input/output DTOs
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.resolver.ts
│   ├── auth.service.spec.ts
│   ├── auth.resolver.spec.ts
│   ├── jwt.strategy.ts
│   ├── gql-auth.guard.ts
│   └── current-user.decorator.ts
│
├── users/                    # User domain logic
│   ├── user.entity.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── (future) users.resolver.ts
│
├── expenses/                 # Expenses domain logic
│   ├── expense.model.ts      # Data model for expense
│   ├── expenses.module.ts
│   ├── expenses.service.ts
│   ├── expenses.resolver.ts
│   ├── expense.service.spec.ts
│   └── expense.resolver.spec.ts
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/expense-tracker-api.git
cd expense-tracker-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run start:dev
```

Visit the GraphQL Playground at:  
➡️ `http://localhost:3000/graphql`

## 🧪 Running Tests

```bash
npm run test
```

Unit tests are colocated with the business logic they test (e.g., services, resolvers).

## 🔮 Future Plans

- [ ] Integrate a persistent database (e.g., PostgreSQL or MongoDB)
- [ ] Add expense categories and filters
- [ ] Monthly/weekly expense summaries
- [ ] Docker setup and production build pipeline
- [ ] Role-based permissions (RBAC)

## 👨‍💻 Author

Built by Hothyfa Elbeera — Full Stack Developer focused on designing scalable, testable systems using modern web technologies.
