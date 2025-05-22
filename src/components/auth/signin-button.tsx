import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface SignInButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function SignInButton({ variant = "outline" }: SignInButtonProps) {
  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <Button variant={variant} onClick={handleSignIn}>
      Sign In
    </Button>
  );
}
