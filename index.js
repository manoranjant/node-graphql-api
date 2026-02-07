//Express middleware
//https://github.com/apollographql/apollo-server?utm_source=chatgpt.com
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

/* ------------------ Mock Data ------------------ */
const users = [
  { id: "1", name: "Alice", email: "alice@test.com" },
  { id: "2", name: "Bob", email: "bob@test.com" },
];

/* ------------------ GraphQL Schema ------------------ */
const typeDefs = `
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
`;

/* ------------------ Resolvers ------------------ */
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const newUser = { id: String(users.length + 1), name, email };
      users.push(newUser);
      return newUser;
    },
  },
};

// // The GraphQL schema
// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;

// // A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     hello: () => "world",
//   },
// };

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

// queries

/*
query GetAllUsers {
  users {
    id
    name
    email
  }
}

query GetUserById {
  user(id: "1") {
    id
    name
    email
  }
}

mutation AddNewUser {
  addUser(name: "Charlie", email: "charlie@test.com") {
    id
    name
    email
  }
}

*/
