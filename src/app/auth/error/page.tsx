import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton } from "@/components/auth/signin-button";

export const metadata: Metadata = {
  title: "Authentication Error",
  description: "There was a problem with your authentication",
};

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-destructive">
            Authentication Error
          </CardTitle>
          <CardDescription className="text-center">
            There was a problem authenticating your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">This could be due to:</p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Invalid credentials</li>
            <li>Missing or incorrect OAuth configuration</li>
            <li>Server error</li>
          </ul>
          <div className="flex justify-center pt-4">
            <SignInButton variant="default" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
