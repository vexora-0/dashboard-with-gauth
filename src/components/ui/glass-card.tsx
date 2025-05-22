"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  variant?: "default" | "subtle" | "strong";
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
  variant = "default",
}: GlassCardProps) {
  const variants = {
    default:
      "bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10",
    subtle:
      "bg-white/60 dark:bg-black/20 backdrop-blur-lg border border-white/15 dark:border-white/5",
    strong:
      "bg-white/90 dark:bg-black/60 backdrop-blur-2xl border border-white/30 dark:border-white/15",
  };

  return (
    <motion.div
      className={cn(
        "rounded-elegant shadow-elegant",
        variants[variant],
        hover &&
          "transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]",
        glow && "shadow-glow",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={
        hover
          ? {
              y: -2,
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
