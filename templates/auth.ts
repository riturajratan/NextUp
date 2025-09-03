import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  
  callbacks: {
    ...authConfig.callbacks,
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  
  events: {
    async createUser({ user }) {
      console.log('New user created:', user.email)
      // You can add welcome email logic here
    },
    
    async signIn({ user, account, profile, isNewUser }) {
      console.log('User signed in:', user.email)
      return true
    }
  }
})