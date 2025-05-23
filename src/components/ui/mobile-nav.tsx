"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { Menu, Home, PizzaIcon, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Overview of your account",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Pizza Orders",
    href: "/dashboard/pizza-orders",
    description: "Manage your pizza orders",
    icon: <PizzaIcon className="h-5 w-5" />,
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="hover:bg-transparent hover:opacity-70"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="border-r pr-0 sm:max-w-xs">
        <SheetHeader className="px-1">
          <SheetTitle className="text-2xl font-bold text-primary">
            Pizza Master
          </SheetTitle>
          <SheetDescription>Modern pizza order management</SheetDescription>
        </SheetHeader>

        {session?.user && (
          <div className="flex items-center gap-3 border-b pb-4 pt-6 mb-4">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{session.user.name}</span>
              <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                {session.user.email}
              </span>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-1 px-1">
          <AnimatePresence>
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3.5 rounded-lg transition-all",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-sm font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                >
                  <span
                    className={cn(
                      "flex-shrink-0 rounded-md p-1.5",
                      pathname === item.href
                        ? "bg-primary-foreground/20"
                        : "bg-primary/10"
                    )}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-base">{item.title}</div>
                    {item.description && (
                      <p className="text-xs opacity-70">{item.description}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {session && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: navItems.length * 0.1 }}
              className="mt-auto pt-4"
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground/70 hover:text-foreground"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </motion.div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
