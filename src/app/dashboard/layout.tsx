"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin?callbackUrl=/dashboard");
    },
  });

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg font-medium">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-8 md:py-10">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
