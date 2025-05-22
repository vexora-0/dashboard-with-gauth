import { auth } from "./src/auth";

// The NextAuth middleware is configured directly from the auth.ts file
export default auth;

// Export the config separately for Middleware matcher
export const config = { matcher: ["/dashboard/:path*"] }; 