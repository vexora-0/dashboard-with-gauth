"use client";

import { Card } from "@/components/ui/card";
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
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2">
      <Card className="p-6 shadow-md">{children}</Card>
    </div>
  );
}
