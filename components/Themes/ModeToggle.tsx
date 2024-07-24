"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-transparent border-none hover:bg-muted/60"
        asChild
      >
        <Button variant="outline" size="icon">
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="bg-background/30 saturate-100 shadow-sm backdrop-blur-[10px] transition-colors"
      >
        <DropdownMenuItem
          className="cursor-pointer hover:bg-background/40"
          onClick={() => setTheme("light")}
        >
          <span className="flex items-center gap-2">
            <Sun size={18} /> Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-background/40"
          onClick={() => setTheme("dark")}
        >
          <span className="flex items-center gap-2">
            <Moon size={18} /> Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-background/40"
          onClick={() => setTheme("system")}
        >
          <span className="flex items-center gap-2">
            <Monitor size={18} /> System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
