"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/public/logo lms.jpg";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserMenu from "./userMenu";
import SwitchMode from "./SwitchMode";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Khóa học", href: "/courses" },
  { name: "Về chúng tôi", href: "/about" },
  { name: "Liên hệ", href: "/contact" },
  { name: "Quản lý", href: "/admin" },
];
export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Tùy biến link Dashboard theo role
  const computedNavItems = navItems.map((item) => {
    if (item.name === "Dashboard" && session?.user) {
      if (session.user.role === "admin") {
        return { ...item, href: "/admin" };
      }
      return { ...item, href: "/dashboard" };
    }
    return item;
  });

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
            {computedNavItems.map((item) => {
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
                Đăng nhập
              </Link>
              <Link
                href={"/login"}
                className={buttonVariants({ variant: "outline" })}
              >
                Bắt đầu
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {computedNavItems.map((item) => {
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
