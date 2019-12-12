import { GraphQLServer } from "graphql-yoga";

/**
 * Type
 * Scalar types - String, Boolean, Int, Float, ID(Unique Identifier)
 */

// type definition (Schema)
// !は必須項目
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Andrew";
    },
    age() {
      return 23;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.1; // nullも可能
    },
    title() {
      return "udemy";
    },
    price() {
      return 12.99;
    },
    releaseYear() {
      return 2019;
    },
    rating() {
      return null;
    },
    inStock() {
      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("the server is up!");
});
