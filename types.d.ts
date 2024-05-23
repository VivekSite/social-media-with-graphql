import { User, Post } from "@prisma/client";

export type TokenUser = {
  image: string | undefined;
  name: string;
  email: string;
  id: string;
  iat: number;
  exp: number;
};
