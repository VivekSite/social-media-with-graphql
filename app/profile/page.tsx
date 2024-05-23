"use client";

import SinglePost from "@/components/SinglePost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useStoreState } from "@/store/store";
import { Post } from "@prisma/client";

const Page = () => {
  const { user, allPosts } = useStoreState();

  const userPosts: Post[] | undefined = allPosts?.filter(
    (post) => post.authorId === user?.id
  );

  const handleImageUpdate = () => {
    
  }

  return (
    <>
      <div className="m-5 flex flex-col sm:flex sm:gap-5 md:flex items-center justify-center">
        <Avatar className=" size-48 text-5xl">
          <AvatarImage src={user?.image} alt="profile" />
          <AvatarFallback>
            {user?.name?.split(" ")[0] ? user?.name.split(" ")[0][0] : "P"}
            {user?.name?.split(" ")[1] ? user.name.split(" ")[1][0] : ""}
          </AvatarFallback>
        </Avatar>

        <Button onClick={handleImageUpdate}>
          Update Image
        </Button>

        <div className="mt-10">
          <h1><span className=" font-semibold">UserId: </span>{user?.id}</h1>
          <h1><span className=" font-semibold">Email: </span>{user?.email}</h1>
          <h1><span className=" font-semibold">Name: </span>{user?.name}</h1>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly mt-20">
        {userPosts?.map((post: Post) => (
          <SinglePost key={post.id} postData={post} />
        ))}
      </div>
    </>
  );
};

export default Page;
