import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface SignOutButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function SignOutButton({ variant = "ghost" }: SignOutButtonProps) {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <Button variant={variant} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
