
"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Navbar } from "@/components/navbar";

export default function NavbarWrapper() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout failed!");
        return;
      }

      toast.success("Logout successful!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Navbar
      user={
        session?.user
          ? {
              name: session.user.name ?? null,
              email: session.user.email ?? null,
              image: session.user.image ?? null,
            }
          : undefined
      }
      isLoggedIn={!isPending && !!session?.user}
      onLogout={handleLogout}
    />
  );
}
