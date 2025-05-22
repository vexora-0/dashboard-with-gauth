import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import { MobileNav } from "@/components/ui/mobile-nav";
import { Sidebar } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pizza Dashboard",
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
          {/* Mobile Header */}
          <header className="md:hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="flex h-14 items-center justify-between px-4">
              <span className="text-lg font-bold tracking-tight text-primary">
                Pizza Dashboard
              </span>
              <MobileNav />
            </div>
          </header>

          <div className="flex min-h-screen">
            {/* Sidebar - Hidden on Mobile */}
            <Sidebar className="hidden md:flex" />

            {/* Main Content */}
            <main className="flex-1 px-4 md:px-6 py-8 md:py-10">
              <div className="mx-auto max-w-6xl">{children}</div>
            </main>
          </div>

          <Toaster position="top-right" expand={false} richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
