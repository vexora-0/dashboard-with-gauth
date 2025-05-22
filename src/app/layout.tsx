import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { AuthStatus } from "@/components/auth/auth-status";
import { SidebarNav } from "@/components/ui/sidebar-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GAuth Dashboard",
  description: "Authentication dashboard with Google OAuth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}
      >
        <Providers>
          <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold tracking-tight">
                  GAuth Dashboard
                </span>
                <SidebarNav />
              </div>
              <AuthStatus />
            </div>
          </header>
          <main className="container mx-auto flex flex-col items-center justify-start py-8 px-4 min-h-[calc(100vh-4rem)]">
            <Card className="w-full max-w-4xl p-6 shadow-md">{children}</Card>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
