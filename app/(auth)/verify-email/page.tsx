"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Check, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const params = useSearchParams();
  const email = (params.get("email") as string) || "";
  const isOtpCompleted = otp.length === 6;

  function handleVerifyEmail() {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully!");
            router.push("/");
          },
          onError: (error) => {
            toast.error(`Verification failed: ${error.error.message}`);
          },
        },
      });
    });
  }
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="">
        <CardTitle className="text-xl text-center font-bold capitalize dark:text-gray-400">
          Please check your email
        </CardTitle>
        <CardDescription className="text-gray-400 text-center !px-0">
          A verification email has been sent to your email address. Please
          follow the instructions in the email to complete the verification
          process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2 w-full "
          >
            <InputOTPGroup>
              <InputOTPSlot className="dark:text-white" index={0} />
              <InputOTPSlot className="dark:text-white" index={1} />
              <InputOTPSlot className="dark:text-white" index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot className="dark:text-white" index={3} />
              <InputOTPSlot className="dark:text-white" index={4} />
              <InputOTPSlot className="dark:text-white" index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-center mt-2 dark:text-gray-400 text-xs">
            Enter the OTP - 6 digit code sent to your email
          </p>
        </div>
        <Button
          disabled={emailPending || !isOtpCompleted}
          onClick={handleVerifyEmail}
          className="mx-auto w-full"
        >
          {emailPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <p>Checking your otp....</p>
            </>
          ) : (
            <>
              <Check className="size-4" />
              <p>Verify Email</p>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
