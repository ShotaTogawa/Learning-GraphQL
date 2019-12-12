import { GraphQLServer } from "graphql-yoga";

// type definition (Schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Andrew";
    },
    location() {
      return "Vancouver";
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
