"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

export interface SignInButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "primary";
  provider?: "google" | "credentials";
  className?: string;
  children?: ReactNode;
}

export function SignInButton({
  variant = "outline",
  provider = "google",
  className = "",
  children,
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
      className={className}
    >
      {children || (
        <>
          <LogIn className="h-4 w-4 mr-2" />
          <span>
            Sign in with {provider === "google" ? "Google" : "Test Account"}
          </span>
        </>
      )}
    </Button>
  );
}
