"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: session, status } = useSession({ required: true });

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {status === "loading" ? (
            <Skeleton className="h-10 w-64 mx-auto" />
          ) : (
            `Hello, ${session?.user?.name || "Guest"}!`
          )}
        </h1>
        <p className="text-muted-foreground mt-2">
          {status === "loading" ? (
            <Skeleton className="h-4 w-48 mx-auto" />
          ) : (
            "Welcome to your protected dashboard"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Authentication Status</h2>
          {status === "loading" ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <p>
              You are signed in as {session?.user?.email || "unknown user"}.
            </p>
          )}
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Account Information</h2>
          {status === "loading" ? (
            <>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {session?.user?.name || "Not provided"}
              </p>
              <p>
                <strong>Email:</strong> {session?.user?.email || "Not provided"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
