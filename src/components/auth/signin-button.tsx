"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "primary";
  provider?: "google" | "credentials";
}

export function SignInButton({
  variant = "outline",
  provider = "google",
}: SignInButtonProps) {
  const handleSignIn = async () => {
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error(`Failed to sign in`);
    }
  };

  return (
    <Button
      variant={variant === "primary" ? "default" : variant}
      onClick={handleSignIn}
      className="flex items-center gap-2"
    >
      <LogIn className="h-4 w-4" />
      <span>
        Sign in with {provider === "google" ? "Google" : "Test Account"}
      </span>
    </Button>
  );
}
