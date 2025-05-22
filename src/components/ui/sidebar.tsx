"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Home, PizzaIcon, LogOut, LucideIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Pizza Orders",
    href: "/dashboard/pizza-orders",
    icon: <PizzaIcon className="h-5 w-5" />,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getInitials = (name: string = "") => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        "flex h-screen w-16 flex-col items-center justify-between border-r bg-card/50 pb-5",
        className
      )}
    >
      <div className="flex w-full flex-col items-center">
        {/* Logo */}
        <div className="flex h-14 w-full items-center justify-center border-b">
          <Link href="/dashboard" className="flex items-center justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              PD
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-4 pt-4 w-full">
          <TooltipProvider>
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                  className="w-full px-2"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-10 w-full items-center justify-center rounded-md",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              );
            })}
          </TooltipProvider>
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4 mt-auto">
        {session?.user && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="h-9 w-9 border-2 border-primary/10">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback>
                      {getInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                {session.user.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="h-9 w-9 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              Sign out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
