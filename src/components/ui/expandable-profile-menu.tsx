"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  LogOut,
  Home,
  BarChart3,
  Truck,
  Bell,
  Pizza,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";

interface ExpandableProfileMenuProps {
  clickToOpen?: boolean; // If true, menu opens on click. If false, always visible
  showQuickActions?: boolean; // If true, shows quick action buttons
  showNavigation?: boolean; // If true, shows navigation grid
}

export function ExpandableProfileMenu({
  clickToOpen = false,
  showQuickActions = true,
  showNavigation = true,
}: ExpandableProfileMenuProps) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(!clickToOpen);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAvatarClick = () => {
    if (clickToOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      className="fixed bottom-8 right-3 z-50 group"
    >
      {/* Profile Circle */}{" "}
      <motion.div
        className={`relative ${clickToOpen ? "cursor-pointer" : ""}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAvatarClick}
      >
        {" "}
        {/* Glowing Background */}{" "}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 -translate-x-2" />{" "}
        {/* Quick Actions Tooltip for clickToOpen mode */}{" "}
        {clickToOpen && !isMenuOpen && (
          <>
            {" "}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap z-10 shadow-lg"
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [5, 0, 0, 5],
                scale: [0.9, 1, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              {" "}
              Quick Actions {/* Small arrow pointing down to profile circle */}{" "}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-primary"></div>{" "}
            </motion.div>{" "}
            {/* Subtle pulsing ring around profile circle */}{" "}
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}{" "}
        {/* Main Circle */}{" "}
        <div className="relative w-16 h-16 bg-gradient-to-br from-background/95 via-background/90 to-background/80 backdrop-blur-xl border border-primary/20 rounded-full shadow-2xl overflow-hidden">
          {/* Avatar */}
          {status === "loading" ? (
            <Skeleton className="w-full h-full rounded-full" />
          ) : (
            <Avatar className="w-full h-full">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 text-primary font-bold text-lg border-0">
                {getInitials(session?.user?.name || "U")}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        {/* Expandable Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 min-w-[280px]"
          >
            {/* Modern Card */}
            <div className="bg-gradient-to-br from-background/95 via-background/90 to-background/85 backdrop-blur-2xl border border-primary/10 rounded-3xl shadow-2xl p-4 space-y-6">
              {/* User Info */}
              <div className="text-center space-y-3 pb-2 border-b border-border">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {status === "loading" ? (
                      <Skeleton className="h-5 w-32 mx-auto" />
                    ) : (
                      session?.user?.name || "Guest User"
                    )}
                  </h3>
                </div>
              </div>
              {/* Navigation Grid */}
              {showNavigation && (
                <div className="grid grid-cols-2 gap-3">
                  <NavigationItem
                    icon={<Home className="w-4 h-4" />}
                    label="Dashboard"
                    gradient="from-blue-500 to-cyan-500"
                    onClick={() => (window.location.href = "/dashboard")}
                  />
                  <NavigationItem
                    icon={<BarChart3 className="w-4 h-4" />}
                    label="Analytics"
                    gradient="from-gray-500 to-gray-500"
                    onClick={() =>
                      toast("Analytics", {
                        description: "Analytics shall be implemented soon",
                      })
                    }
                  />
                  <NavigationItem
                    icon={<Pizza className="w-4 h-4" />}
                    label="Orders"
                    gradient="from-orange-500 to-red-500"
                    onClick={() =>
                      (window.location.href = "/dashboard/pizza-orders")
                    }
                  />
                  <NavigationItem
                    icon={<Truck className="w-4 h-4" />}
                    label="Delivery"
                    gradient="from-gray-500 to-gray-500"
                    onClick={() =>
                      toast("Delivery", {
                        description: "Delivery shall be implemented soon",
                      })
                    }
                  />
                </div>
              )}
              {/* Quick Actions - Conditionally rendered */}{" "}
              {showQuickActions && (
                <motion.div
                  className="space-y-2 pt-2 border-t border-border/50 relative"
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: 1,
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.1)",
                      "0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    opacity: { delay: 0.3, duration: 0.5 },
                    boxShadow: { delay: 1, duration: 2, repeat: 2 },
                  }}
                >
                  {" "}
                  {/* Quick Actions Label */}{" "}
                  <div className="mb-3">
                    {" "}
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {" "}
                      Quick Actions{" "}
                    </span>{" "}
                  </div>
                  <QuickAction
                    icon={<Bell className="w-4 h-4" />}
                    label="Notifications"
                    onClick={() => {}}
                  />
                  <QuickAction
                    icon={<Settings className="w-4 h-4" />}
                    label="Settings"
                    onClick={() => {}}
                  />
                  <QuickAction
                    icon={<LogOut className="w-4 h-4" />}
                    label="Sign Out"
                    variant="danger"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  />{" "}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  onClick: () => void;
}

function NavigationItem({
  icon,
  label,
  gradient,
  onClick,
}: NavigationItemProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm border border-border/50 rounded-2xl p-4 text-left overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <div
          className={`inline-flex p-2 bg-gradient-to-r ${gradient} rounded-xl text-white shadow-lg group-hover:shadow-xl transition-shadow`}
        >
          {icon}
        </div>
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
    </motion.button>
  );
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "danger";
  onClick: () => void;
}

function QuickAction({
  icon,
  label,
  variant = "default",
  onClick,
}: QuickActionProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group ${
        variant === "danger"
          ? "hover:bg-red-500/10 hover:border-red-500/20 text-red-600 dark:text-red-400"
          : "hover:bg-muted/50 text-foreground"
      }`}
    >
      <div
        className={`p-1.5 rounded-lg transition-colors ${
          variant === "danger"
            ? "bg-red-500/10 group-hover:bg-red-500/20"
            : "bg-muted/50 group-hover:bg-primary/10"
        }`}
      >
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
      <motion.div
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary"
        initial={{ x: -5 }}
        whileHover={{ x: 2 }}
      >
        {" "}
        →{" "}
      </motion.div>
    </motion.button>
  );
}
