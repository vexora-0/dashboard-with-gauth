"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingIconProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "accent" | "success" | "warning" | "info";
  float?: boolean;
  glow?: boolean;
}

export function FloatingIcon({
  children,
  className = "",
  size = "md",
  variant = "primary",
  float = true,
  glow = false,
}: FloatingIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-12 h-12 p-2.5",
    lg: "w-16 h-16 p-3.5",
    xl: "w-20 h-20 p-4",
  };

  const variantClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/50 text-secondary-foreground border-secondary/30",
    accent: "bg-accent/50 text-accent-foreground border-accent/30",
    success:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    warning:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  };

  return (
    <motion.div
      className={cn(
        "rounded-full border backdrop-blur-sm flex items-center justify-center",
        "transition-all duration-300 ease-out",
        sizeClasses[size],
        variantClasses[variant],
        glow && "shadow-glow",
        className
      )}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.4 },
      }}
      {...(float && {
        animate: {
          y: [0, -4, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      })}
    >
      {children}
    </motion.div>
  );
}
