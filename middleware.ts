import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  
  const pathname = req.nextUrl.pathname;
  
  // Protect routes that start with /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all routes under /dashboard
    "/dashboard/:path*",
  ],
}; 