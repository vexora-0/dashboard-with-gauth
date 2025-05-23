"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { Menu, Home, PizzaIcon } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    description: "Dashboard home page",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Pizza Orders",
    href: "/dashboard/pizza-orders",
    description: "View and manage pizza orders",
    icon: <PizzaIcon className="h-4 w-4" />,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "transition-all duration-200 gap-1.5 group",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent/50"
                  )}
                >
                  <Link href={item.href}>
                    <span className="transition-all duration-200 group-hover:scale-105">
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-primary">Navigation</SheetTitle>
              <SheetDescription>
                Access dashboard pages from here.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "rounded-md p-1.5",
                      pathname === item.href
                        ? "bg-primary-foreground/20"
                        : "bg-background/50"
                    )}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div>{item.title}</div>
                    {item.description && (
                      <p className="text-xs opacity-70">{item.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
