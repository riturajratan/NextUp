'use client'

import { useSession } from 'next-auth/react'

/**
 * Custom hook to get current user information
 * 
 * @returns {Object} Object containing user data and authentication state
 * 
 * Usage:
 * ```tsx
 * import { useCurrentUser } from '@/hooks/use-current-user'
 * 
 * function MyComponent() {
 *   const { user, isLoading, isAuthenticated } = useCurrentUser()
 *   
 *   if (isLoading) return <div>Loading...</div>
 *   if (!isAuthenticated) return <div>Please sign in</div>
 *   
 *   return <div>Welcome {user?.name}!</div>
 * }
 * ```
 */
export function useCurrentUser() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    session
  }
}

/**
 * Hook to check if user has a specific role
 * 
 * @param requiredRole - The role to check for
 * @returns {boolean} Whether the user has the required role
 * 
 * Note: Requires adding role to session in auth.ts callbacks
 */
export function useRole(requiredRole: 'USER' | 'ADMIN' | 'SUPER_ADMIN') {
  const { user } = useCurrentUser()
  
  // You'll need to extend the session to include role
  // See AUTH_GUIDE.md for instructions
  // return user?.role === requiredRole
  
  return false // Placeholder
}

/**
 * Hook to require authentication
 * Redirects to sign in if not authenticated
 * 
 * Usage:
 * ```tsx
 * import { useRequireAuth } from '@/hooks/use-current-user'
 * 
 * function ProtectedComponent() {
 *   const { user } = useRequireAuth()
 *   
 *   return <div>Welcome {user?.name}!</div>
 * }
 * ```
 */
export function useRequireAuth() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // This will redirect to the sign in page
      window.location.href = '/auth/signin'
    }
  })
  
  return {
    user: session?.user,
    isLoading: status === 'loading',
    session
  }
}