import { auth } from '@/auth'
import { NextResponse } from 'next/server'

/**
 * Example of a protected API route
 * 
 * This route requires authentication to access
 * Returns 401 if user is not authenticated
 * 
 * Test with:
 * ```bash
 * curl http://localhost:3000/api/examples/protected
 * ```
 */
export async function GET() {
  // Check authentication
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json(
      { 
        error: 'Unauthorized',
        message: 'You must be signed in to access this endpoint' 
      },
      { status: 401 }
    )
  }
  
  // Return protected data
  return NextResponse.json({
    message: 'This is protected data',
    user: {
      email: session.user.email,
      name: session.user.name
    },
    timestamp: new Date().toISOString()
  })
}

/**
 * Example POST endpoint with authentication
 */
export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const body = await request.json()
    
    // Process the authenticated request
    return NextResponse.json({
      message: 'Data received',
      user: session.user.email,
      data: body
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}