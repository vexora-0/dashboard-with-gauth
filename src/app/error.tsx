"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useEffect } from "react";
import { HeroGradient } from "@/components/ui/hero-gradient";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingIcon } from "@/components/ui/floating-icon";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <HeroGradient>
      <div className="container-wide flex items-center justify-center min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <GlassCard className="p-12 space-y-8">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center"
            >
              <FloatingIcon variant="warning" size="xl" glow>
                <AlertTriangle className="w-12 h-12" />
              </FloatingIcon>
            </motion.div>

            {/* Error Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                <span className="text-gradient-warm">Oops!</span>{" "}
                <span className="text-foreground">Something went wrong</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                We encountered an unexpected error while processing your
                request. Don&apos;t worry, our team has been notified and
                we&apos;re working on a fix.
              </p>
            </motion.div>

            {/* Error Details */}
            {error.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-destructive/5 border border-destructive/20 rounded-lg p-4"
              >
                <p className="text-sm font-mono text-destructive break-words">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                onClick={reset}
                size="lg"
                className="group flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex-1 glass hover:scale-105 transition-all duration-300"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-6 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                If the problem persists, please{" "}
                <a
                  href="mailto:support@pizzadashboard.com"
                  className="text-primary hover:underline font-medium"
                >
                  contact our support team
                </a>{" "}
                for assistance.
              </p>
            </motion.div>
          </GlassCard>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute top-20 left-10 opacity-10"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 opacity-10"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <RefreshCw className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </HeroGradient>
  );
}
