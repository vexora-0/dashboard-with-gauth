"use client";

import { useSession } from "next-auth/react";
import { SignInButton } from "@/components/auth/signin-button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, BarChart3, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingIcon } from "@/components/ui/floating-icon";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center relative overflow-hidden min-h-screen">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(120,119,198,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.02),transparent_50%)]" />

      {/* Main content */}
      <motion.div
        className="container-wide relative z-10 text-center max-w-4xl mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium text-muted-foreground mb-8 backdrop-blur-sm"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Revolutionizing business management
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">Smart</span>
          <br />
          <span className="text-foreground">Dashboard</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-16"
        >
          <SignInButton
            variant="default"
            provider="google"
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-elegant bg-primary text-primary-foreground shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </SignInButton>
        </motion.div>
      </motion.div>

      {/* Subtle corner decorations */}
      <motion.div
        className="absolute top-8 right-8 w-24 h-24 opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <BarChart3 className="w-full h-full text-muted-foreground" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 w-20 h-20 opacity-5"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <Users className="w-full h-full text-muted-foreground" />
      </motion.div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <GlassCard className="p-6 h-full text-center group hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <FloatingIcon variant="primary" size="md" float={false}>
            {icon}
          </FloatingIcon>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
