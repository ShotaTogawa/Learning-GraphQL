import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
  /* prisma.ymlのsecretの内容と同じものを書く */
  secret: "thisismysecrettext",
  fragmentReplacements
});

export default prisma;

// prisma.query prisma.mutation prisma.subscription prisma.exists

/**
 * Query
 */

// prisma.query.users(null, "{ id name email posts{ id title} }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, "{ id text author { id name }} ").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.exists
//   .Comment({
//     id: "ck4ow92v600rx0767celympgu"
//   })
//   .then(exists => console.log(exists));

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId });

//   if (!userExists) {
//     throw new Error("User not found");
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     "{ author { id name email posts{id title published}}}"
//   );
//   return post.author;
// };

// createPostForUser("ck4ow6i2600q50767q30s26wi", {
//   title: "Greate books to read",
//   body: "something interesting",
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(err => console.log(err));

/**
 * Mutation
 */

// GraphQLPlayGroundのDocに書いてある;

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId });
//   if (!postExists) {
//     throw new Error("Post not found");
//   }
//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data
//     },
//     "{ author {id name email posts { id title published }} }"
//   );

//   return post.author;
// };

// updatePostForUser("ck4ov1uoh00ei0767ozvcbj1g", {
//   published: true
// })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   })
//   .catch(err => console.log(err));
