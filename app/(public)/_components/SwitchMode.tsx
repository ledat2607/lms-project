"use client";

import { useId, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function SwitchMode() {
  const { theme, setTheme } = useTheme();

  const id = useId();
  const [checked, setChecked] = useState<boolean>(true);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          onClick={toggleTheme}
          checked={checked}
          onCheckedChange={setChecked}
          className="peer data-[state=checked]:bg-primary/80 data-[state=unchecked]:bg-primary/80 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="peer-data-[state=checked]:text-muted-foreground/70 pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center">
          <MoonIcon
            size={16}
            aria-hidden="true"
            className=" text-gray-500 dark:text-white"
          />
        </span>
        <span className="peer-data-[state=unchecked]:text-muted-foreground/70 pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center">
          <SunIcon
            size={16}
            aria-hidden="true"
            className="text-rose-800 dark:text-gray-500"
          />
        </span>
      </div>
      <Label htmlFor={id} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
}
