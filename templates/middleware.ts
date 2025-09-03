import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

/**
 * Middleware to protect routes and handle authentication redirects
 * 
 * This middleware runs before every request and:
 * 1. Protects /dashboard routes - requires authentication
 * 2. Protects /api routes (except /api/auth) - requires authentication
 * 3. Redirects authenticated users away from auth pages
 * 4. Handles role-based access control for admin routes
 */
export default async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Define route types
  const isAuthPage = pathname.startsWith('/auth')
  const isProtectedRoute = pathname.startsWith('/dashboard')
  const isAdminRoute = pathname.startsWith('/admin')
  const isApiRoute = pathname.startsWith('/api')
  const isPublicApiRoute = pathname.startsWith('/api/auth') || pathname.startsWith('/api/public')

  // Handle API route protection
  if (isApiRoute && !isPublicApiRoute && !session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  // Redirect to signin if accessing protected route without session
  if (isProtectedRoute && !session) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  // Handle admin route protection
  if (isAdminRoute) {
    if (!session) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }

    // Check for admin role (you'll need to add role to session)
    // const user = await getUserFromDb(session.user.id)
    // if (user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') {
    //   return NextResponse.redirect(new URL('/dashboard', request.url))
    // }
  }

  // Redirect to dashboard if accessing auth pages with active session
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ]
}