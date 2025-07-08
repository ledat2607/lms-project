import { ModeToggle } from "@/components/themeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center">
      <ModeToggle />
      <div className="flex w-full max-w-sm flex-col gap-6">{children}</div>
    </div>
  );
}