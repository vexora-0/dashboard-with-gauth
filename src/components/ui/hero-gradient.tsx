"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeroGradientProps {
  children: ReactNode;
  className?: string;
}

export function HeroGradient({ children, className = "" }: HeroGradientProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Primary Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
