"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft, MapPin } from "lucide-react";
import { HeroGradient } from "@/components/ui/hero-gradient";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingIcon } from "@/components/ui/floating-icon";

export default function NotFound() {
  return (
    <HeroGradient>
      <div className="container-wide flex items-center justify-center min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <GlassCard className="p-12 space-y-8">
            {/* 404 Number with Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-gradient opacity-20 select-none">
                404
              </div>

              {/* Floating Search Icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <FloatingIcon variant="info" size="xl" glow>
                  <Search className="w-12 h-12" />
                </FloatingIcon>
              </motion.div>
            </motion.div>

            {/* Title and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6 -mt-8"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-foreground">Page</span>{" "}
                <span className="text-gradient">Not Found</span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Looks like this pizza slice went missing! The page you&apos;re
                looking for might have been moved, deleted, or is temporarily
                unavailable.
              </p>
            </motion.div>

            {/* Suggested Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="/dashboard">
                    <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Back to Dashboard
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 glass hover:scale-105 transition-all duration-300"
                >
                  <Link href="/">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">
                  Maybe you were looking for one of these?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <QuickLink
                    href="/dashboard"
                    icon={<Home className="w-4 h-4" />}
                    label="Dashboard"
                  />
                  <QuickLink
                    href="/dashboard/pizza-orders"
                    icon={<MapPin className="w-4 h-4" />}
                    label="Pizza Orders"
                  />
                  <QuickLink
                    href="/"
                    icon={<Search className="w-4 h-4" />}
                    label="Home Page"
                  />
                </div>
              </div>
            </motion.div>
          </GlassCard>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute top-20 left-10 opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Search className="w-10 h-10 text-primary" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 opacity-20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <MapPin className="w-8 h-8 text-purple-500" />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-20 opacity-15"
            animate={{
              x: [0, 15, 0],
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          >
            <Home className="w-6 h-6 text-blue-500" />
          </motion.div>
        </motion.div>
      </div>
    </HeroGradient>
  );
}

interface QuickLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function QuickLink({ href, icon, label }: QuickLinkProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className="flex items-center gap-2 p-3 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all duration-200 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        {icon}
        {label}
      </Link>
    </motion.div>
  );
}
