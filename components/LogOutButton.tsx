'use client'

import { Button } from "@/components/ui/button";
import { useStoreState } from "@/store/store";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
    const router = useRouter();
    const { setIsLoggedIn } = useStoreState();

  const handleLogOut = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("sb-bupcfjiplkeuimqddutg-auth-token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return <Button onClick={handleLogOut}>LogOut</Button>;
};

export default LogOutButton;
