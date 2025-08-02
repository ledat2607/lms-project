"use client";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePaymentConfetti } from "@/hooks/payment-confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { triggerPaymentConfetti } = usePaymentConfetti();
  useEffect(() => {
    triggerPaymentConfetti(); // 🎉 gọi khi trang vừa vào
  }, [triggerPaymentConfetti]);
  return (
    <>
      <div className="w-full h-screen flex flex-1 justify-center items-center">
        <Card className="w-[350px]">
          <div className="w-full flex justify-center">
            <CheckIcon className="size-12 p-2 bg-green-400 rounded-full" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Successfull</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tighter">
              Congratulations, continue your learning
            </p>
            <Link
              href={`/courses`}
              className={buttonVariants({
                variant: "destructive",
                className: "mt-4 w-3/4",
              })}
            >
              <ArrowLeft />
              Go back
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}
