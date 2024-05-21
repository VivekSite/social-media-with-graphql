import { serverContext } from "./types";

export const resolvers: any = {
  Query: {
    novels: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.novel.findMany();
    },
    novel: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.novel.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Novel: {
    authors: async (parent: any, args: any, context: serverContext) => {
      return await context.prisma.author.findMany({
        where: {
          novelId: parent.id,
        },
      });
    },
  },

  Mutation: {
    // add novel
    addNovel: async (_parent: any, args: any, context: serverContext) => {
      return await context.prisma.novel.create({
        data: {
          name: args.name,
          title: args.title,
          image: args.image,
        },
      });
    },

    // update novel
    updateNovel: async (_parent: any, args: any, context: serverContext) => {
      return await context.prisma.novel.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          image: args.image,
        },
      });
    },

    // delete novel
    deleteNovel: async (_parent: any, args: any, context: serverContext) => {
      return await context.prisma.novel.delete({
        where: {
          id: args.id,
        },
      });
    },

    // add author
    addAuthor: async (_parent: any, args: any, context: serverContext) => {
      return await context.prisma.author.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
    },

    // delete author
    deleteAuthor: async (_parent: any, args: any, context: serverContext) => {
      return await context.prisma.author.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
