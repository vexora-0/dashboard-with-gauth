"use client";

import { useSession } from "next-auth/react";
import { SignInButton } from "./signin-button";
import { SignOutButton } from "./signout-button";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="flex items-center gap-4">
        {session.user.name && (
          <span className="hidden text-sm md:inline-block">
            {session.user.name}
          </span>
        )}
        <SignOutButton />
      </div>
    );
  }

  return <SignInButton />;
}
