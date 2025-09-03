# NextUp Authentication Guide 🔐

Complete guide for implementing authentication in your NextUp project.

## Table of Contents
- [Quick Start](#quick-start)
- [Authentication Flow](#authentication-flow)
- [Protecting Routes](#protecting-routes)
- [Using Auth in Components](#using-auth-in-components)
- [API Route Protection](#api-route-protection)
- [User Management](#user-management)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Quick Start

### 1. Environment Setup
First, configure your authentication providers in `.env`:

```env
# Required for all auth methods
NEXTAUTH_SECRET="your-32-character-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Provider (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourapp.com"

# Optional OAuth Providers
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxxxx"
GITHUB_ID="xxxxx"
GITHUB_SECRET="xxxxx"
```

### 2. Generate NextAuth Secret
```bash
openssl rand -base64 32
```

## Authentication Flow

### How It Works
1. User clicks "Sign In"
2. Redirected to `/auth/signin`
3. User chooses auth method:
   - **Email**: Enters email → Receives magic link → Clicks link → Signed in
   - **OAuth**: Clicks provider → Redirected to provider → Approves → Signed in
4. After sign in, redirected to `/dashboard` or callback URL

### Sign In Methods

#### Email Magic Link (Passwordless)
```tsx
// Sign in with email
import { signIn } from 'next-auth/react'

const handleEmailSignIn = async (email: string) => {
  await signIn('resend', {
    email,
    callbackUrl: '/dashboard'
  })
}
```

#### OAuth Sign In
```tsx
// Sign in with OAuth providers
const handleOAuthSignIn = async (provider: 'google' | 'github') => {
  await signIn(provider, {
    callbackUrl: '/dashboard'
  })
}
```

#### Sign Out
```tsx
import { signOut } from 'next-auth/react'

const handleSignOut = async () => {
  await signOut({ callbackUrl: '/' })
}
```

## Protecting Routes

### 1. Middleware Protection (Recommended)
Create `middleware.ts` in your project root:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

export default async function middleware(request: NextRequest) {
  const session = await auth()
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // Redirect to signin if accessing protected route without session
  if (isProtectedRoute && !session) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  // Redirect to dashboard if accessing auth pages with active session
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/api/:path*']
}
```

### 2. Server Component Protection
```tsx
// app/dashboard/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
    </div>
  )
}
```

### 3. Client Component Protection
```tsx
'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientProtectedPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin')
    }
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Protected Client Page</h1>
      <p>Hello {session?.user?.email}</p>
    </div>
  )
}
```

## Using Auth in Components

### Get Current User (Server Component)
```tsx
import { auth } from '@/auth'

export default async function UserProfile() {
  const session = await auth()
  
  if (!session?.user) return null
  
  return (
    <div>
      <img src={session.user.image} alt="Profile" />
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
    </div>
  )
}
```

### Get Current User (Client Component)
```tsx
'use client'

import { useSession } from 'next-auth/react'

export default function UserAvatar() {
  const { data: session } = useSession()
  
  if (!session?.user) return null
  
  return (
    <div>
      <img src={session.user.image} alt="Avatar" />
      <span>{session.user.name}</span>
    </div>
  )
}
```

### Session Provider Setup
Wrap your app with SessionProvider for client components:

```tsx
// app/layout.tsx
import { SessionProvider } from '@/components/session-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

Create the provider component:
```tsx
// components/session-provider.tsx
'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}
```

## API Route Protection

### Protect API Routes
```typescript
// app/api/protected/route.ts
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  return NextResponse.json({
    message: 'Protected data',
    user: session.user
  })
}
```

### Using Session in API Routes
```typescript
// app/api/user/profile/route.ts
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      plan: true
    }
  })
  
  return NextResponse.json(user)
}
```

## User Management

### Get User from Database
```typescript
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

async function getCurrentUser() {
  const session = await auth()
  
  if (!session?.user?.email) return null
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      apiKeys: true,
      accounts: true
    }
  })
  
  return user
}
```

### Update User Profile
```typescript
// app/api/user/update/route.ts
import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  const session = await auth()
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: body.name,
      // Add other fields as needed
    }
  })
  
  return NextResponse.json(updatedUser)
}
```

### Check User Roles
```typescript
import { auth } from '@/auth'
import { prisma } from '@/lib/db'

async function isAdmin() {
  const session = await auth()
  if (!session?.user?.id) return false
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })
  
  return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
}

// Usage in component
export default async function AdminPanel() {
  const admin = await isAdmin()
  
  if (!admin) {
    return <div>Access Denied</div>
  }
  
  return <div>Admin Panel Content</div>
}
```

## Common Patterns

### Conditional Rendering Based on Auth
```tsx
import { auth } from '@/auth'
import Link from 'next/link'

export default async function Navigation() {
  const session = await auth()
  
  return (
    <nav>
      <Link href="/">Home</Link>
      {session ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/api/auth/signout">Sign Out</Link>
        </>
      ) : (
        <>
          <Link href="/auth/signin">Sign In</Link>
        </>
      )}
    </nav>
  )
}
```

### Custom Sign In Page Redirect
```tsx
// Force redirect to custom page after sign in
import { signIn } from 'next-auth/react'

const handleSignIn = () => {
  signIn('google', {
    callbackUrl: '/onboarding' // Redirect here after sign in
  })
}
```

### Loading States
```tsx
'use client'

import { useSession } from 'next-auth/react'

export default function AuthComponent() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div>Loading authentication...</div>
  }
  
  if (status === 'unauthenticated') {
    return <div>Please sign in</div>
  }
  
  return <div>Welcome {session?.user?.name}!</div>
}
```

### Custom Hooks for Auth
```typescript
// hooks/use-current-user.ts
import { useSession } from 'next-auth/react'

export function useCurrentUser() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated'
  }
}

// Usage
function MyComponent() {
  const { user, isLoading, isAuthenticated } = useCurrentUser()
  
  if (isLoading) return <Spinner />
  if (!isAuthenticated) return <SignInPrompt />
  
  return <div>Hello {user?.name}</div>
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "NEXTAUTH_SECRET is missing"
**Solution**: Generate and add a secret to your `.env`:
```bash
openssl rand -base64 32
```

#### 2. OAuth Redirect Mismatch
**Solution**: Ensure callback URLs match exactly:
- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

#### 3. Session is null in API routes
**Solution**: Make sure you're importing auth from the correct path:
```typescript
import { auth } from '@/auth' // Not from 'next-auth'
```

#### 4. Email not sending
**Solution**: Check Resend API key and verify sender domain

#### 5. User not persisting in database
**Solution**: Ensure Prisma schema is migrated:
```bash
npx prisma db push
```

### Debug Mode
Enable debug mode in `auth.config.ts`:
```typescript
export default {
  debug: process.env.NODE_ENV === 'development',
  // ... other config
}
```

## Security Best Practices

1. **Always validate session server-side** for sensitive operations
2. **Use CSRF protection** (built into NextAuth)
3. **Implement rate limiting** for auth endpoints
4. **Use HTTPS in production**
5. **Rotate NEXTAUTH_SECRET** periodically
6. **Validate and sanitize** all user inputs
7. **Implement proper error handling** without exposing sensitive info

## Next Steps

- Customize auth pages in `/app/auth/*`
- Add social login providers
- Implement role-based access control
- Add two-factor authentication
- Set up email templates for magic links
- Implement session management dashboard

---

Need help? Check the [NextAuth.js documentation](https://authjs.dev/) or create an issue in the NextUp repository.