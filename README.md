# GAuth Dashboard

A modern Next.js dashboard with Google OAuth authentication using NextAuth.js.

## Features

- Next.js App Router
- TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- NextAuth.js for authentication
- Google OAuth provider
- Protected routes with middleware
- Toast notifications for auth errors
- Responsive layout

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Console account for OAuth credentials

### Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add "http://localhost:3000" as an Authorized JavaScript origin
7. Add "http://localhost:3000/api/auth/callback/google" as an Authorized redirect URI
8. Click "Create" and note your Client ID and Client Secret

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Testing Authentication

1. Click "Sign In" on the homepage
2. Select Google as your authentication provider
3. Complete the OAuth flow
4. You should be redirected back to the application as an authenticated user
5. Try accessing the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Troubleshooting

### Authentication Failures

- Ensure your Google OAuth credentials are correct in `.env.local`
- Verify that the redirect URI matches exactly: `http://localhost:3000/api/auth/callback/google`
- Check that your application has been verified in Google Cloud Console

### Session Issues

- Make sure `NEXTAUTH_SECRET` is properly set
- Clear browser cookies and try again
- Check the server logs for any errors

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
