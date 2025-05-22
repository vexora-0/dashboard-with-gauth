"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FloatingIcon } from "./floating-icon";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon?: ReactNode;
  description?: string;
  className?: string;
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  description,
  className = "",
  variant = "default",
}: StatsCardProps) {
  const variantStyles = {
    default: "border-border",
    success: "border-green-500/20 bg-green-500/5",
    warning: "border-yellow-500/20 bg-yellow-500/5",
    info: "border-blue-500/20 bg-blue-500/5",
    destructive: "border-red-500/20 bg-red-500/5",
  };

  const getChangeColor = (type: "increase" | "decrease") => {
    switch (type) {
      case "increase":
        return "text-green-600 dark:text-green-400";
      case "decrease":
        return "text-red-600 dark:text-red-400";
    }
  };

  const getChangeIcon = (type: "increase" | "decrease") => {
    return type === "increase" ? "↗" : "↘";
  };

  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-elegant border bg-card shadow-elegant",
        "hover:shadow-xl transition-all duration-300 ease-out",
        "backdrop-blur-sm",
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-6 translate-x-6 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              {value}
            </motion.div>
          </div>

          {icon && (
            <FloatingIcon
              size="md"
              variant="primary"
              float={false}
              className="ml-3"
            >
              {icon}
            </FloatingIcon>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {change && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                getChangeColor(change.type)
              )}
            >
              <span className="text-xs">{getChangeIcon(change.type)}</span>
              {Math.abs(change.value)}%
            </motion.div>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="text-xs text-muted-foreground flex-1 text-right"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
