'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreatePostDialog from "@/components/CreatePostDialog";
import LogOutButton from "@/components/LogOutButton";
import { Button } from "@/components/ui/button";

import { useStoreState } from "@/store/store";
import Link from "next/link";

const NavBar = () => {
  const { isLoggedIn, user } = useStoreState();

  return (
    <>
      <div className="bg-secondary w-full h-[4rem] flex justify-between items-center p-5">
        <Link href={"/"}>
          <h2 className="text-2xl">MEMORIES</h2>
        </Link>

        <div className="flex gap-3">
          {isLoggedIn ? (
            <>
              {/* Component for creating post */}
              <CreatePostDialog />

              {/* LogOut Button */}
              <LogOutButton />
              <Avatar>
                <AvatarImage src={user?.profileImage} alt="profile" />
                <AvatarFallback> CN </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
