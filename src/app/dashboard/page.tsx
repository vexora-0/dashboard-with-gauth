"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Clock, Activity, TrendingUp, Pizza, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { StatsCard } from "@/components/ui/stats-card";
import { FloatingIcon } from "@/components/ui/floating-icon";
import { ExpandableProfileMenu } from "@/components/ui/expandable-profile-menu";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession({ required: true });

  const userGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col space-y-8 w-full"
    >
      {/* Enhanced Hero Section */}
      <GlassCard className="p-8 lg:p-10 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent rounded-full -translate-y-20 translate-x-20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full translate-y-10 -translate-x-10 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Welcome Section - Simplified */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  {userGreeting()}
                </span>
                <span className="text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground"
              >
                {status === "loading" ? (
                  <Skeleton className="h-16 w-96" />
                ) : (
                  <>
                    Welcome back,{" "}
                    <span className="text-gradient bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {session?.user?.name?.split(" ")[0] || "Guest"}
                    </span>
                    !
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-muted-foreground max-w-2xl"
              >
                {status === "loading" ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  "Here's what's happening with your pizza business today"
                )}
              </motion.p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Total Orders Today"
          value="24"
          change={{ value: 12, type: "increase" }}
          icon={<Pizza className="w-5 h-5" />}
          description="vs yesterday"
          variant="success"
        />
        <StatsCard
          title="Revenue"
          value="$1,248"
          change={{ value: 8, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5" />}
          description="this week"
          variant="info"
        />
        <StatsCard
          title="Active Orders"
          value="7"
          icon={<Clock className="w-5 h-5" />}
          description="in progress"
          variant="warning"
        />
        <StatsCard
          title="Customer Rating"
          value="4.8"
          change={{ value: 2, type: "increase" }}
          icon={<Star className="w-5 h-5" />}
          description="avg rating"
          variant="success"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            Quick Actions
          </h2>
          <span className="text-sm text-muted-foreground">
            Get things done faster
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Manage Orders"
            description="View, update, and track all your pizza orders in real-time"
            link="/dashboard/pizza-orders"
            icon={<Pizza className="w-6 h-6" />}
            stats="24 orders today"
            variant="primary"
          />
          <QuickActionCard
            title="Analytics"
            description="Dive deep into your business metrics and performance"
            link="/dashboard/analytics"
            icon={<TrendingUp className="w-6 h-6" />}
            stats="↗ 12% growth"
            variant="success"
          />
          <QuickActionCard
            title="Delivery Areas"
            description="Manage delivery zones and optimize your coverage"
            link="/dashboard/delivery"
            icon={<MapPin className="w-6 h-6" />}
            stats="8 active zones"
            variant="info"
          />
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              Recent Activity
            </h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} {...activity} delay={index * 0.1} />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Expandable Profile Menu */}
      <ExpandableProfileMenu
        clickToOpen={true}
        showQuickActions={true}
        showNavigation={false}
      />
    </motion.div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  stats: string;
  variant: "primary" | "success" | "info";
}

function QuickActionCard({
  title,
  description,
  link,
  icon,
  stats,
  variant,
}: QuickActionCardProps) {
  return (
    <Link href={link}>
      <GlassCard className="p-6 h-full cursor-pointer group">
        <div className="flex items-start gap-4">
          <FloatingIcon
            variant={variant}
            size="md"
            float={false}
            className="flex-shrink-0"
          >
            {icon}
          </FloatingIcon>

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                {stats}
              </span>
              <motion.div
                className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 2 }}
              >
                →
              </motion.div>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

const recentActivities = [
  {
    type: "order",
    title: "New order received",
    description: "Margherita Pizza - Order #1234",
    time: "2 minutes ago",
    variant: "success" as const,
  },
  {
    type: "delivery",
    title: "Order delivered",
    description: "Supreme Pizza delivered to downtown",
    time: "15 minutes ago",
    variant: "info" as const,
  },
  {
    type: "review",
    title: "New customer review",
    description: "5-star rating from John D.",
    time: "1 hour ago",
    variant: "success" as const,
  },
];

interface ActivityItemProps {
  type: string;
  title: string;
  description: string;
  time: string;
  variant: "success" | "info" | "warning";
  delay?: number;
}

function ActivityItem({
  type,
  title,
  description,
  time,
  variant,
  delay = 0,
}: ActivityItemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Pizza className="w-4 h-4" />;
      case "delivery":
        return <MapPin className="w-4 h-4" />;
      case "review":
        return <Star className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors"
    >
      <FloatingIcon variant={variant} size="sm" float={false}>
        {getIcon(type)}
      </FloatingIcon>

      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <span className="text-xs text-muted-foreground">{time}</span>
    </motion.div>
  );
}
