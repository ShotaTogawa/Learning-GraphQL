import { GraphQLServer } from "graphql-yoga";

/**
 * Type
 * Scalar types - String, Boolean, Int, Float, ID(Unique Identifier)
 */

// type definition (Schema)
// !は必須項目かを決める
// type 大文字から始まる単語
const typeDefs = `
  type Query {
    greeting(name: String!, position: String!): String!
    me: User!
    post: Post!
    add(a: Float!, b: Float!): Float!
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
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}. Your position is ${args.position}`;
      } else {
        return "Hello";
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
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
