"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubIsPending, startGithubTransition] = useTransition();

  //Login function for GitHub
  async function loginWithGithub() {
    startGithubTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success("Redirecting...");
            },
            onError: () => {
              toast.error(`Login failed: Internal error`);
            },
          },
        });
      } catch (error) {
        toast.error("Failed to login with GitHub");
      }
    });
  }
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="text-3xl font-bold dark:text-gray-200">
        Welcome back !
      </CardHeader>
      <CardDescription className="text-gray-500 dark:text-gray-300">
        Please enter your credentials to continue.
      </CardDescription>
      <CardContent>
        <Button
          disabled={githubIsPending}
          onClick={loginWithGithub}
          variant={"default"}
          className="w-full"
        >
          {githubIsPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading....</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Login with Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-3">
          <span className="relative z-10 bg-card dark:bg-gray-700 dark:text-white px-2">
            Or countinue with Google
          </span>
        </div>

        <div className="grid gap-3 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button variant={"default"}>Coutinue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
