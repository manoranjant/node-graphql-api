# GraphQL API (Apollo Server)

This project is a simple **GraphQL API** built using **Apollo Server v4** and **Node.js**.  
It demonstrates how to run Apollo Server using both:

- **Standalone Server**
- **Express Middleware**

The API supports basic user queries and mutations.

Reference : https://github.com/apollographql/apollo-server?utm_source=chatgpt.com

---

## Features

- GraphQL API using Apollo Server
- Query users and user by ID
- Add new users using mutations
- Supports both Standalone and Express-based setups
- ES Modules (`type: module`)

---

## Tech Stack

- Node.js
- Apollo Server v4
- GraphQL
- Express (optional)
- CORS

---

## GraphQL Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  addUser(name: String!, email: String!): User!
}
```
