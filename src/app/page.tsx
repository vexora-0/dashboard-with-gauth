"use client";

import { useSession } from "next-auth/react";
import { SignInButton } from "@/components/auth/signin-button";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ShieldCheck,
  Clock,
  PieChart,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { HeroGradient } from "@/components/ui/hero-gradient";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingIcon } from "@/components/ui/floating-icon";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <HeroGradient>
      <div className="container-wide py-20 sm:py-32 lg:py-40 flex flex-col items-center justify-center relative z-10 min-h-screen">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Now with enhanced analytics
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          </motion.div>

          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <FloatingIcon size="xl" variant="primary" glow>
              <PieChart className="w-10 h-10" />
            </FloatingIcon>
          </motion.div>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-gradient">Pizza</span>{" "}
            <span className="text-foreground">Dashboard</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Transform your pizza business with a{" "}
            <span className="text-foreground font-medium">beautiful</span>,{" "}
            <span className="text-foreground font-medium">intuitive</span>{" "}
            dashboard that puts your orders at your fingertips.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="pt-8"
          >
            <SignInButton
              variant="default"
              provider="google"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </SignInButton>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-24 w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Secure & Reliable"
            description="Enterprise-grade security with Google OAuth ensures your data is always protected and accessible only to you."
            delay={0.1}
            variant="success"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Lightning Fast"
            description="Real-time order updates and instant analytics help you make quick decisions and improve customer satisfaction."
            delay={0.2}
            variant="warning"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            title="Data-Driven Insights"
            description="Comprehensive analytics and beautiful visualizations turn your order data into actionable business intelligence."
            delay={0.3}
            variant="info"
          />
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="flex items-center gap-8 mt-20 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 border-2 border-background"
                />
              ))}
            </div>
            <span className="text-sm font-medium">Trusted by pizza owners</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="text-sm">
            <span className="font-medium text-foreground">99.9%</span> uptime
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="text-sm">
            <span className="font-medium text-foreground">24/7</span> support
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PieChart className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 opacity-20"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Clock className="w-6 h-6 text-purple-500" />
        </motion.div>
      </div>
    </HeroGradient>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  variant?: "success" | "warning" | "info";
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  variant = "success",
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <GlassCard className="p-8 h-full">
        <div className="flex flex-col items-center text-center space-y-4">
          <FloatingIcon variant={variant} size="lg" glow>
            {icon}
          </FloatingIcon>

          <h3 className="text-xl font-semibold text-foreground">{title}</h3>

          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
