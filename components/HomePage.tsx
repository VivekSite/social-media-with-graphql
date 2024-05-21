'use client'

import { useEffect } from "react";
import { useStoreState } from "@/store/store";
import SinglePost from "./SinglePost";
import axios from "axios";
import { Post } from "@/types";

const HomePage = () => {
  const { setIsLoggedIn, setUser, allPosts, setAllPosts } = useStoreState();

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/post");

      setAllPosts(response.data.data);
    } catch (error: any) {
      console.log(`Error fetching posts: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    const profile = localStorage.getItem("profile");
    const isGoogleLoggedIn = localStorage.getItem("sb-bupcfjiplkeuimqddutg-auth-token");

    const data = JSON.parse(profile ? profile : "{}");
    const googleSession = JSON.parse(isGoogleLoggedIn ? isGoogleLoggedIn : "{}");

    if(profile || isGoogleLoggedIn){
      setIsLoggedIn(true);
      setUser(data?.user || googleSession?.user?.identities[0]?.identity_data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoggedIn, setUser, allPosts]);

  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        {allPosts?.map((post: Post) => (
          <SinglePost key={post._id} postData={post} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
