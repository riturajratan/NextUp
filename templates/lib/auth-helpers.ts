import { auth } from '@/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

/**
 * Server-side authentication helpers
 * Use these in Server Components and API routes
 */

/**
 * Get the current authenticated user from the database
 * Includes additional user data not in the session
 */
export async function getCurrentUser() {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return null
    }
    
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        plan: true,
        createdAt: true,
        onboardingCompleted: true,
        stripeCustomerId: true
      }
    })
    
    return user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

/**
 * Require authentication for a page
 * Redirects to sign in if not authenticated
 * 
 * Usage in Server Component:
 * ```tsx
 * import { requireAuth } from '@/lib/auth-helpers'
 * 
 * export default async function ProtectedPage() {
 *   const session = await requireAuth()
 *   return <div>Welcome {session.user.email}</div>
 * }
 * ```
 */
export async function requireAuth() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/auth/signin')
  }
  
  return session
}

/**
 * Require a specific user role
 * Redirects to dashboard if user doesn't have the required role
 * 
 * Usage:
 * ```tsx
 * import { requireRole } from '@/lib/auth-helpers'
 * 
 * export default async function AdminPage() {
 *   const user = await requireRole('ADMIN')
 *   return <div>Admin Dashboard</div>
 * }
 * ```
 */
export async function requireRole(role: 'USER' | 'ADMIN' | 'SUPER_ADMIN') {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/signin')
  }
  
  if (user.role !== role && user.role !== 'SUPER_ADMIN') {
    redirect('/dashboard')
  }
  
  return user
}

/**
 * Check if the current user has a specific role
 * Returns boolean without redirecting
 */
export async function hasRole(role: 'USER' | 'ADMIN' | 'SUPER_ADMIN') {
  const user = await getCurrentUser()
  
  if (!user) return false
  
  return user.role === role || user.role === 'SUPER_ADMIN'
}

/**
 * Check if user owns a resource
 * Useful for authorization checks
 * 
 * Usage:
 * ```tsx
 * const canEdit = await isOwner('apiKey', apiKeyId, userId)
 * ```
 */
export async function isOwner(
  resourceType: 'apiKey' | 'project' | 'team',
  resourceId: string,
  userId?: string
) {
  const user = await getCurrentUser()
  
  if (!user) return false
  
  const checkUserId = userId || user.id
  
  switch (resourceType) {
    case 'apiKey':
      const apiKey = await prisma.apiKey.findFirst({
        where: {
          id: resourceId,
          userId: checkUserId
        }
      })
      return !!apiKey
      
    // Add more resource types as needed
    default:
      return false
  }
}

/**
 * Get user's API usage for the current month
 * Useful for implementing usage limits
 */
export async function getUserUsage(userId?: string) {
  const user = await getCurrentUser()
  
  if (!user && !userId) return null
  
  const targetUserId = userId || user?.id
  if (!targetUserId) return null
  
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  
  // This is an example - adjust based on your schema
  // const usage = await prisma.usageRecord.aggregate({
  //   where: {
  //     userId: targetUserId,
  //     createdAt: {
  //       gte: startOfMonth
  //     }
  //   },
  //   _count: true
  // })
  
  return {
    count: 0, // usage._count
    limit: user?.plan === 'FREE' ? 100 : user?.plan === 'PRO' ? 10000 : Infinity
  }
}

/**
 * Rate limiting helper
 * Returns true if user has exceeded rate limit
 */
export async function isRateLimited(
  identifier: string,
  limit: number = 10,
  window: number = 60000 // 1 minute in ms
) {
  // Implement your rate limiting logic here
  // This is a simple in-memory example - use Redis in production
  
  // Example with Redis:
  // const key = `rate_limit:${identifier}`
  // const current = await redis.incr(key)
  // if (current === 1) {
  //   await redis.expire(key, window / 1000)
  // }
  // return current > limit
  
  return false
}