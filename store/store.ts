import { create } from "zustand";
import { TokenUser } from "@/types";
import { Post } from "@prisma/client";
import axios from "axios";

export type useStoreStateTypes = {
  isLoggedIn: boolean,
  user: TokenUser | null,
  allPosts: Post[] | null,
  setUser: (user: TokenUser | null) => void
  setIsLoggedIn: (value: boolean) => void,
  setAllPosts: (value: Post[] | null) => void,
}

export const useStoreState = create<useStoreStateTypes>((set) => ({
  user: null,
  allPosts: [],
  isLoggedIn: false,
  setAllPosts: (value: Post[] | null) => set(() => ({ allPosts: value })),
  setUser: (user: TokenUser | null) => set(() => ({ user })),
  setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value})),
}))