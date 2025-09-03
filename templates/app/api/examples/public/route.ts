import { NextResponse } from 'next/server'

/**
 * Example of a public API route
 * 
 * This route is accessible without authentication
 * Anyone can access this endpoint
 * 
 * Test with:
 * ```bash
 * curl http://localhost:3000/api/examples/public
 * ```
 */
export async function GET() {
  return NextResponse.json({
    message: 'This is a public API endpoint',
    documentation: 'No authentication required',
    timestamp: new Date().toISOString()
  })
}

/**
 * Public POST endpoint example
 * Accepts data from anyone but might have rate limiting
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // You might want to add rate limiting here
    // Example: await checkRateLimit(request.ip)
    
    return NextResponse.json({
      message: 'Public endpoint received your data',
      received: body,
      note: 'Consider adding rate limiting for public endpoints'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}