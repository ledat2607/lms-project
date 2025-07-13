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
import { GithubIcon, Loader, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [githubIsPending, startGithubTransition] = useTransition();
  const [emailIsPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

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

  //Login function for Email
  function loginWithEmail() {
    startEmailTransition(async () => {
      try {
        await authClient.emailOtp.sendVerificationOtp({
          email: email,
          type: "sign-in",
          fetchOptions: {
            onSuccess: () => {
              toast.success(
                "Verification email sent! Please check your inbox."
              );
              router.push(`/verify-email?email=${email}`);
            },
            onError: () => {
              toast.error(
                "Failed to send verification email. Please try again."
              );
            },
          },
        });
      } catch (error) {
        toast.error("Failed to login with Email");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@email.com"
              className="dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <Button
            onClick={loginWithEmail}
            disabled={emailIsPending}
            variant={"default"}
          >
            {emailIsPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span> Countinue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
