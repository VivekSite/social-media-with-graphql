import { create } from "zustand";
import { User, Post } from "@/types";

export type useStoreStateTypes = {
  isLoggedIn: boolean,
  user: User | null,
  allPosts: Post[] | null,
  setUser: (user: User) => void
  setIsLoggedIn: (value: boolean) => void,
  setAllPosts: (value: Post[] | null) => void
}

export const useStoreState = create<useStoreStateTypes>((set) => ({
  user: null,
  allPosts: [],
  isLoggedIn: false,
  setAllPosts: (value: Post[] | null) => set(() => ({ allPosts: value })),
  setUser: (user: User) => set(() => ({ user })),
  setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value}))
}))