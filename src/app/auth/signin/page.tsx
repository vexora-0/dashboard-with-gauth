import { Metadata } from "next";
import { SignInButton } from "@/components/auth/signin-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-5">
          <SignInButton variant="default" provider="google" />

          <div className="flex items-center w-full">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="text-center text-sm text-muted-foreground mb-2">
            <p>For testing use credentials:</p>
            <p className="font-mono text-xs">
              username: test
              <br />
              password: test
            </p>
          </div>

          <SignInButton variant="outline" provider="credentials" />
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>This is a demo application with sample authentication</p>
        </CardFooter>
      </Card>
    </div>
  );
}
