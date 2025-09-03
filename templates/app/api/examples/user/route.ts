import { auth } from '@/auth'
import { getCurrentUser } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * Example user profile API endpoints
 * Shows how to work with user data in API routes
 */

/**
 * GET /api/examples/user
 * Get current user's profile
 */
export async function GET() {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Get full user data from database
  const user = await getCurrentUser()
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    plan: user.plan,
    onboardingCompleted: user.onboardingCompleted,
    createdAt: user.createdAt
  })
}

/**
 * PATCH /api/examples/user
 * Update current user's profile
 */
export async function PATCH(request: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const body = await request.json()
    
    // Validate input
    const allowedFields = ['name', 'image', 'onboardingCompleted']
    const updates: any = {}
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updates,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        onboardingCompleted: true
      }
    })
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/examples/user
 * Delete user account (with confirmation)
 */
export async function DELETE(request: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const body = await request.json()
    
    // Require confirmation
    if (body.confirm !== true) {
      return NextResponse.json(
        { error: 'Confirmation required' },
        { status: 400 }
      )
    }
    
    // Delete user and all related data (cascading delete)
    await prisma.user.delete({
      where: { email: session.user.email }
    })
    
    return NextResponse.json({
      message: 'Account deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}