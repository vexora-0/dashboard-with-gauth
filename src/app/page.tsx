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
  TrendingUp,
  Users,
  Pizza,
  BarChart3,
  CheckCircle2,
  Star,
  ArrowRight,
  Play,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { HeroGradient } from "@/components/ui/hero-gradient";
import { GlassCard } from "@/components/ui/glass-card";
import { FloatingIcon } from "@/components/ui/floating-icon";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <>
      <HeroGradient>
        <div className="container-wide relative z-10 min-h-screen">
          {/* Hero Section */}
          <section className="py-20 sm:py-32 lg:py-40 flex flex-col items-center justify-center">
            <motion.div
              className="text-center space-y-8 max-w-5xl mx-auto"
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
                🚀 Revolutionizing Pizza Business Management
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
                  <Pizza className="w-12 h-12" />
                </FloatingIcon>
              </motion.div>

              {/* Hero Title */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="text-gradient">Slice</span>{" "}
                <span className="text-foreground">Through</span>
                <br />
                <span className="text-foreground">Business</span>{" "}
                <span className="text-gradient">Chaos</span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              >
                From dough to door, manage every slice of your pizza empire with
                our{" "}
                <span className="text-gradient font-semibold">
                  next-generation
                </span>{" "}
                dashboard that turns data into delicious insights.
              </motion.p>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {[
                  "Real-time Orders",
                  "Smart Analytics",
                  "Team Management",
                  "Growth Insights",
                ].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="px-4 py-2 bg-background/20 backdrop-blur-sm border border-border/30 rounded-full text-sm font-medium text-foreground/80"
                  >
                    ✨ {feature}
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <SignInButton
                  variant="default"
                  provider="google"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Pizza Journey
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </SignInButton>

                <motion.button
                  className="group inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {[
                { number: "10K+", label: "Orders Processed", icon: Pizza },
                { number: "500+", label: "Pizza Businesses", icon: Users },
                {
                  number: "99.9%",
                  label: "Uptime Guarantee",
                  icon: CheckCircle2,
                },
                { number: "24/7", label: "Expert Support", icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-3xl font-bold text-gradient">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="py-20">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Pizza Owners <span className="text-gradient">Love Us</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the perfect blend of simplicity and power with
                features designed for modern pizza businesses.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <FeatureCard
                icon={<ShieldCheck className="w-8 h-8" />}
                title="Bank-Level Security"
                description="Your data is protected with enterprise-grade encryption and Google OAuth, ensuring complete privacy and security for your business."
                delay={0.1}
                variant="success"
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8" />}
                title="Lightning-Fast Performance"
                description="Real-time order tracking, instant notifications, and blazing-fast analytics help you serve customers better and faster."
                delay={0.2}
                variant="warning"
              />
              <FeatureCard
                icon={<BarChart3 className="w-8 h-8" />}
                title="Smart Analytics"
                description="Transform raw order data into actionable insights with beautiful charts, trends, and predictions that drive growth."
                delay={0.3}
                variant="info"
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8" />}
                title="Growth Tracking"
                description="Monitor your business growth with detailed metrics, revenue tracking, and performance indicators that matter."
                delay={0.4}
                variant="success"
              />
              <FeatureCard
                icon={<Users className="w-8 h-8" />}
                title="Team Management"
                description="Coordinate your entire team with role-based access, task management, and collaborative tools built for pizza businesses."
                delay={0.5}
                variant="warning"
              />
              <FeatureCard
                icon={<Globe className="w-8 h-8" />}
                title="Global Accessibility"
                description="Access your dashboard from anywhere, anytime, with responsive design that works perfectly on all devices."
                delay={0.6}
                variant="info"
              />
            </motion.div>
          </section>

          {/* Testimonial */}
          <section className="py-20">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <GlassCard className="p-12">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-8 leading-relaxed">
                  "This dashboard revolutionized how we manage our pizza chain.
                  Orders are up 40% and customer satisfaction has never been
                  higher!"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold">
                    MC
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Mario Castellano</div>
                    <div className="text-muted-foreground">
                      Owner, Mario's Pizza Empire
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient">Transform</span> Your
                Pizza Business?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of pizza owners who've already elevated their
                business with our platform.
              </p>
              <SignInButton
                variant="default"
                provider="google"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Get Started Free Today
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </SignInButton>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Setup in 2 minutes • Cancel anytime
              </p>
            </motion.div>
          </section>

          {/* Floating animations */}
          <motion.div
            className="absolute top-20 left-10 opacity-10"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pizza className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-10 opacity-10"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <BarChart3 className="w-10 h-10 text-purple-500" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 left-20 opacity-10"
            animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Users className="w-8 h-8 text-green-500" />
          </motion.div>
        </div>
      </HeroGradient>

      {/* Footer */}
      <Footer />
    </>
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
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <GlassCard className="p-8 h-full hover:shadow-xl transition-all duration-300 group">
        <div className="flex flex-col items-center text-center space-y-4">
          <FloatingIcon variant={variant} size="lg" glow>
            {icon}
          </FloatingIcon>

          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
