import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ModeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="p-12">
      <h1 className="text-2xl">Home page</h1>
      <ModeToggle />
      {session ? (
        <>
          <p>{session.user.email}</p>
        </>
      ) : (
        <>
          <Button>Logout</Button>
        </>
      )}
    </div>
  );
}
