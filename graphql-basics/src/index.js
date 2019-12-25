import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
let users = [
  {
    id: "1",
    name: "Andrew",
    email: "andrew@example.com",
    age: 27
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com"
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com"
  }
];

let posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1",
    comment: "1"
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is an advanced GraphQL post...",
    published: false,
    author: "1",
    comment: "2"
  },
  {
    id: "12",
    title: "Programming Music",
    body: "",
    published: false,
    author: "2",
    comment: "2"
  }
];

let comments = [
  {
    id: "1",
    text: "comment1",
    author: "1",
    post: "12"
  },
  {
    id: "2",
    text: "comment2",
    author: "1",
    post: "11"
  },
  {
    id: "3",
    text: "comment3",
    author: "2",
    post: "11"
  },
  {
    id: "4",
    text: "comment4",
    author: "3",
    post: "10"
  }
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        deletePost(postId: ID!): Post!
        createComment(data: CreateCommentInput!): Comment!
        deleteComment(commentId: ID!): Comment!
    }

    input CreateUserInput {
      name: String!
      email: String!
      age: Int
    }

    input CreatePostInput{
      title: String!,
      body: String!,
      published: Boolean,
      author: ID!
    }

    input CreateCommentInput {
      text: String!,
      author: ID!,
      post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return comments;
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    me() {
      return {
        id: "123098",
        name: "Mike",
        email: "mike@example.com"
      };
    },
    post() {
      return {
        id: "092",
        title: "GraphQL 101",
        body: "",
        published: false
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email);
      if (emailTaken) {
        throw new Error("Emial taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);
      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error("user not found");
      }

      const deletedUsers = users.splice(userIndex, 1);
      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }
        return !match;
      });

      comments = comments.filter(comment => comment.author !== args.id);
      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);
      if (!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        ...args.data
        // title: args.title,
        // body: args.body,
        // published: args.published,
        // author: args.author
      };

      posts.push(post);
      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex(post => post.id === args.postId);

      if (postIndex === -1) {
        throw new Error("post not found");
      }

      const deletedPost = posts.splice(postIndex, 1);

      comments = comments.filter(comment => comment.post !== args.postId);
      return deletedPost[0];
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);
      const postExists = posts.some(
        post => post.id === args.data.post && post.published
      );
      if (!userExists || !postExists) {
        throw new Error("unable to find user and post");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
        // text: args.text,
        // author: args.author,
        // post: args.post
      };

      comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex(
        comment => comment.id === args.commentId
      );

      if (commentIndex === -1) {
        throw new Error("comment not found");
      }

      const deletedComment = comments.splice(commentIndex, 1);

      comments = comments.filter(comment => comment.id !== args.commentId);
      return deletedComment[0];
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, arg, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
