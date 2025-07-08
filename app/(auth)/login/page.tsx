import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { GithubIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-3xl font-bold">Welcome back !</CardHeader>
      <CardDescription className="text-gray-500">
        Please enter your credentials to continue.
      </CardDescription>
      <CardContent>
        <Button variant={"outline"} className="w-full">
          <GithubIcon className="size-4" />
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
}
