import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Code2, Zap, Shield, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8" />
            <span className="text-2xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME || 'MyApp'}</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/docs" className="text-sm font-medium hover:text-primary">
              Documentation
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/auth/signin">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Build Amazing Apps Faster
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A complete Next.js boilerplate with authentication, database, and beautiful UI components.
            Start building your next project in minutes, not hours.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/signin">
              <Button size="lg">Start Building</Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">View Documentation</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>Fast Setup</CardTitle>
              <CardDescription>
                Get started in minutes with pre-configured authentication and database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">NextAuth configured</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Prisma database</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">TypeScript ready</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>Secure by Default</CardTitle>
              <CardDescription>
                Built with security best practices and modern authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">JWT tokens</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">OAuth providers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">CSRF protection</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 mb-4 text-primary" />
              <CardTitle>Production Ready</CardTitle>
              <CardDescription>
                Scalable architecture with all the features you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">API routes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Beautiful UI</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Responsive design</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Built With Modern Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-black text-white rounded-lg p-4 mb-2">
              <span className="text-lg font-bold">Next.js</span>
            </div>
            <p className="text-sm text-muted-foreground">React Framework</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-4 mb-2">
              <span className="text-lg font-bold">TypeScript</span>
            </div>
            <p className="text-sm text-muted-foreground">Type Safety</p>
          </div>
          <div className="text-center">
            <div className="bg-cyan-500 text-white rounded-lg p-4 mb-2">
              <span className="text-lg font-bold">Tailwind</span>
            </div>
            <p className="text-sm text-muted-foreground">CSS Framework</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 text-white rounded-lg p-4 mb-2">
              <span className="text-lg font-bold">Prisma</span>
            </div>
            <p className="text-sm text-muted-foreground">Database ORM</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6" />
              <span className="text-lg font-semibold">{process.env.NEXT_PUBLIC_APP_NAME || 'MyApp'}</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-primary">Terms</Link>
              <Link href="/privacy" className="hover:text-primary">Privacy</Link>
              <Link href="/docs" className="hover:text-primary">Docs</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}