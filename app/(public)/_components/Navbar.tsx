"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo lms.jpg";
import { ModeToggle } from "@/components/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserMenu from "./userMenu";
import SwitchMode from "./SwitchMode";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/admin" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95  backdrop-blur-[backdrop-filter]:bg-background/80 dark:bg-gray-800">
      <div className="container mx-auto flex min-h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center mr-4 space-x-4">
          <Image src={Logo} alt="Logo" width={80} />
          <span className="font-bold">LMS Store</span>
        </Link>

        {/* Desktop */}

        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm fonmet-medium text-muted-foreground hover:text-foreground dark:hover:text-gray-100 px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center space-x-4">
          <SwitchMode />
          {isPending ? null : session ? (
            <UserMenu />
          ) : (
            <div className="space-x-4">
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "default" })}
              >
                Login
              </Link>
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
