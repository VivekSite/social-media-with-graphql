"use client";

import { useEffect } from "react";
import { useStoreState } from "@/store/store";
import SinglePost from "./SinglePost";
import axios from "axios";
import { Post } from "@prisma/client";

const HomePage = () => {
  const { setUser, setIsLoggedIn, allPosts, setAllPosts } = useStoreState();

  const verifyToken = async (token: String) => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/verify",
        { token }
      );

      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error: any) {
      if (error?.response?.data?.includes("Token is expired")) {
        console.log("Token is expired. Please Login again");
        localStorage.removeItem("token");
      }
      console.log(`Error while verifying token: ${error.message}`);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post");
      setAllPosts(response?.data);
    } catch (error: any) {
      console.log(`Error fetching posts: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllPosts();

    // Verify the token
    const Item = localStorage.getItem("token");
    const { token } = JSON.parse(Item ? Item : "{}");
    verifyToken(token);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        {allPosts?.map((post: Post) => (
          <SinglePost key={post.id} postData={post} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
