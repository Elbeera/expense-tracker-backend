# Expense Tracker API

A modular, extensible **GraphQL API** built with **NestJS** and **TypeScript** to support personal and business expense tracking. Designed with clean architecture principles, the backend serves as a secure, scalable foundation for a future-facing frontend dashboard or mobile app.

---

## Tech Stack

| Layer    | Technology                     | Purpose                                              |
| -------- | ------------------------------ | ---------------------------------------------------- |
| Backend  | [NestJS](https://nestjs.com)   | Scalable Node.js framework with modular architecture |
| API      | [GraphQL](https://graphql.org) | Query-optimized API interface                        |
| Auth     | JWT (stateless)                | Secure token-based user authentication               |
| Language | TypeScript                     | Static typing and maintainable codebase              |
| Testing  | Jest                           | Unit testing and test-driven development             |

## Features

- **JWT Authentication**

  - Login and signup via GraphQL mutations
  - Secure access to user-specific resources
  - Custom guards and decorators for clean auth logic

- **Expense Management**

  - Full CRUD functionality via GraphQL
  - Expense ownership tied to authenticated users
  - Modular service/resolver architecture

- **User Management**

  - Lightweight user module for authentication and data access
  - Easily extendable to support profiles, preferences, and roles

- **Testable Architecture**
  - Unit tests written for services and resolvers
  - Designed with maintainability and CI/CD pipelines in mind

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run start:dev
```

Visit the GraphQL Playground at:  
`http://localhost:3000/graphql`

## Running Tests

```bash
npm run test
```

## Future Plans

- [ ] Integrate a persistent database (e.g., PostgreSQL or MongoDB)
- [ ] Add expense filters
- [ ] Monthly/weekly expense summaries

## 👨‍💻 Author

Built by Hothyfa Elbeera — Full Stack Developer focused on designing scalable, testable systems using modern web technologies.
