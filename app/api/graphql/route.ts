import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";
import prisma from "@/prisma/db";
import { serverContext } from "./types";
import { NextRequest } from "next/server";

const apolloServer = new ApolloServer<serverContext>({ resolvers, typeDefs });

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
    context: (req, res) => ({ req, res, prisma })
});

export { handler as GET, handler as POST };
