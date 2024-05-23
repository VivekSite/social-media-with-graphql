import { serverContext } from "./types";

export const resolvers: any = {
  Query: {
    posts: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.post.findMany();
    },

    post: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },

    users: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.user.findMany();
    },

    userById: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },

    userByEmail: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
    },

  },

  Post: {
    author: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
    },
  },

  User: {
    posts: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    },
  }

  // Mutation: {
  //   // add novel
  //   addNovel: async (_parent: any, args: any, context: serverContext) => {
  //     return await context.prisma.novel.create({
  //       data: {
  //         name: args.name,
  //         title: args.title,
  //         image: args.image,
  //       },
  //     });
  //   },

  //   // update novel
  //   updateNovel: async (_parent: any, args: any, context: serverContext) => {
  //     return await context.prisma.novel.update({
  //       where: {
  //         id: args.id,
  //       },
  //       data: {
  //         title: args.title,
  //         image: args.image,
  //       },
  //     });
  //   },

  //   // delete novel
  //   deleteNovel: async (_parent: any, args: any, context: serverContext) => {
  //     return await context.prisma.novel.delete({
  //       where: {
  //         id: args.id,
  //       },
  //     });
  //   },
  // },
};
