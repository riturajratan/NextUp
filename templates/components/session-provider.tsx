'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

/**
 * Session Provider Component
 * 
 * Wraps the application with NextAuth session context
 * This enables the useSession hook in client components
 * 
 * Usage:
 * Add this to your root layout.tsx:
 * 
 * import { SessionProvider } from '@/components/session-provider'
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <SessionProvider>
 *           {children}
 *         </SessionProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */
export function SessionProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}