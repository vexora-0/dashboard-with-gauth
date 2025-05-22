import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface SignInButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function SignInButton({ variant = "outline" }: SignInButtonProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <Button variant={variant} onClick={handleSignIn}>
      Sign in with Google
    </Button>
  );
}
