import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { CircularNav } from "@/components/ui/circular-nav";
import { AnimatedBackground } from "@/components/ui/animated-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Master",
  description: "Modern pizza order management dashboard with Google OAuth",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}
      >
        <Providers>
          {/* Animated Background - only show on dashboard pages */}
          <AnimatedBackground />

          {/* Creative Circular Navigation - only show on dashboard pages */}
          <CircularNav />

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          <Toaster position="top-right" expand={false} richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
