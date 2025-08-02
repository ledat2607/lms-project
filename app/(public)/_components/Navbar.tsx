"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/public/logo lms.jpg";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserMenu from "./userMenu";
import SwitchMode from "./SwitchMode";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/admin" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10); // scroll 10px là đổi màu
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex min-h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center mr-4 space-x-4">
          <Image src={Logo} alt="Logo" width={80} />
          <span className="font-bold">LMS Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium px-3 py-2 transition-colors ${
                    isActive
                      ? "text-primary border-b-2 border-primary dark:text-white"
                      : "text-muted-foreground hover:text-foreground dark:hover:text-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 focus:outline-none"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t">
            <SwitchMode />
            {isPending ? null : session ? (
              <UserMenu />
            ) : (
              <div className="mt-2 space-y-2">
                <Link
                  href={"/login"}
                  className={buttonVariants({
                    variant: "default",
                    className: "w-full block text-center",
                  })}
                >
                  Login
                </Link>
                <Link
                  href={"/login"}
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full block text-center",
                  })}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
