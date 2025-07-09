import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Logo from "@/public/logo lms.jpg";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center">
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6 ">
        <Link
          href={"/"}
          className="flex items-center self-center font-bold text-3xl"
        >
          <Image
            src={Logo}
            alt="LMS Logo"
            width={80}
            height={80}
            className="rounded-2xl mr-2"
          />
          LMS
          <span className="text-blue-500 dark:text-slate-700 ml-2">Store.</span>
        </Link>
        {children}
        <div className="text-sm text-center text-balance">
          By clicking continue you agree to our{" "}
          <span className="underline dark:text-blue-500 cursor-pointer">Term of service</span>{" "}
          and{" "}
          <span className="underline dark:text-blue-500 cursor-pointer">Privacy policy</span>.
        </div>
      </div>
    </div>
  );
}