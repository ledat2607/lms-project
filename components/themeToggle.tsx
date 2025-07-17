"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils" // Nếu bạn có hàm cn, dùng để gộp classNames

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isAnimating, setIsAnimating] = React.useState(false)

  const toggleTheme = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark")
      setIsAnimating(false)
    }, 300) // thời gian khớp với transition
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 rounded-md flex items-center justify-center",
        "transition-all duration-300 hover:scale-105 active:scale-95"
      )}
    >
      {/* Sun Icon */}
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-600",
          "rotate-0 scale-100 opacity-100",
          "dark:scale-0 dark:rotate-90 dark:opacity-0",
          isAnimating && "animate-spin"
        )}
      />

      {/* Moon Icon */}
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 text-white",
          "scale-0 opacity-0",
          "dark:scale-100 dark:opacity-100"
        )}
      />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
