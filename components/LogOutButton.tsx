'use client'

import { Button } from "@/components/ui/button";
import { useStoreState } from "@/store/store";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
    const router = useRouter();
    const { setIsLoggedIn, setUser } = useStoreState();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return <Button onClick={handleLogOut}>LogOut</Button>;
};

export default LogOutButton;
