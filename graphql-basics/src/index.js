import { GraphQLServer } from "graphql-yoga";

/**
 * Type
 * Scalar types - String, Boolean, Int, Float, ID(Unique Identifier)
 */

// type definition (Schema)
// !は必須項目
const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "12451",
        name: "mike",
        email: "mike@example.com",
        age: 28
      };
    },
    post() {
      return {
        id: "1",
        title: "First post",
        body: "",
        published: false
      };
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
