import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Resend from 'next-auth/providers/resend'

export default {
  providers: [
    // Email provider (Magic Links)
    Resend({
      from: process.env.EMAIL_FROM || 'noreply@yourapp.com',
      apiKey: process.env.RESEND_API_KEY
    }),
    
    // OAuth providers (optional)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error'
  },
  
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnApiRoute = nextUrl.pathname.startsWith('/api')
      
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }
      
      return true
    },
    
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    }
  }
} satisfies NextAuthConfig