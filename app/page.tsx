"use client";
import { ModeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut(){
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully logged out");
          router.push("/login");
        },
        onError: () => {
          toast.error("Failed to log out");
        },
      },
    });
  }
  return (
    <div className="p-12">
      <h1 className="text-2xl">Home page</h1>
      <ModeToggle />
      {session ? (
        <>
          <p>{session.user.email}</p>
          <Button onClick={signOut}>Logout</Button>
        </>
      ) : (
        <>
          <Button>Login</Button>
        </>
      )}
    </div>
  );
}
