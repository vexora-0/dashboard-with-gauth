import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignOutButton } from "@/components/auth/signout-button";

export function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">Dashboard App</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          {session?.user && (
            <div className="flex items-center gap-4">
              <p className="text-sm hidden md:block">
                {session.user.name || session.user.email}
              </p>
              <SignOutButton />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
