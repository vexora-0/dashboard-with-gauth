"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PizzaIcon } from "lucide-react";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CircularNavProps {
  className?: string;
}

export function CircularNav({ className }: CircularNavProps) {
  const { data: session } = useSession();

  if (!session) return null;


  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 pointer-events-none",
          className
        )}
      >
        {/* Enhanced Glass background */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-white/10 pointer-events-auto">
          {/* Glass gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          {/* Subtle pattern for glass texture */}
          <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-white via-transparent to-white" />
        </div>

        <div className="relative flex items-center justify-between h-16 px-6 pointer-events-auto">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="relative">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground font-bold shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <PizzaIcon className="h-5 w-5" />
              </motion.div>
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary to-purple-600 opacity-20 blur"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Pizza Master
            </span>
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
}
