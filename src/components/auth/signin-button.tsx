import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Google } from "lucide-react";

interface SignInButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "primary";
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
    <Button
      variant={variant === "primary" ? "default" : variant}
      onClick={handleSignIn}
      className="flex items-center gap-2"
    >
      <Google className="h-4 w-4" />
      <span>Sign in with Google</span>
    </Button>
  );
}
