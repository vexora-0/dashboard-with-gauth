import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Return response as-is for pages that passed authentication
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        // Only allow authenticated users to access protected routes
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
  }
);

// Protect all routes under /dashboard
export const config = { 
  matcher: ["/dashboard/:path*"] 
}; 