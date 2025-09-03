# NextUp 🚀

A complete, production-ready Next.js boilerplate with authentication, database, and beautiful UI components. Get your next project running in minutes, not hours.

## ✨ What's Included

- **Next.js 14** with App Router and TypeScript
- **NextAuth 5** with multiple providers (Email, Google, GitHub)
- **Prisma** ORM with PostgreSQL support
- **shadcn/ui** components with Tailwind CSS
- **Pre-built auth pages** (signin, verification, error handling)
- **Dashboard layout** with user management
- **API route structure** ready for expansion
- **TypeScript** configuration optimized for development

## 🚀 Quick Start

1. **Create a new project using the boilerplate:**
   ```bash
   chmod +x create-boilerplate.sh
   ./create-boilerplate.sh my-awesome-project
   cd my-awesome-project
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Email Provider (Resend)
   RESEND_API_KEY="your-resend-api-key"
   EMAIL_FROM="noreply@yourapp.com"
   
   # OAuth Providers (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME="My Awesome App"
   ```

3. **Set up the database:**
   ```bash
   npx prisma db push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 📁 Project Structure

```
├── app/
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Protected dashboard
│   ├── api/           # API routes
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Landing page
├── components/
│   └── ui/            # shadcn/ui components
├── lib/
│   ├── db.ts          # Database client
│   └── utils.ts       # Utility functions
├── prisma/
│   └── schema.prisma  # Database schema
├── auth.ts            # NextAuth configuration
├── auth.config.ts     # NextAuth providers
└── components.json    # shadcn/ui config
```

## 🔐 Authentication

This boilerplate includes three authentication methods:

### Email Magic Links (Default)
- Passwordless authentication via email
- Uses Resend for email delivery
- Secure and user-friendly

### OAuth Providers
- **Google OAuth**: Sign in with Google accounts
- **GitHub OAuth**: Sign in with GitHub accounts
- Easy to add more providers

### Configuration
All auth configuration is in `auth.config.ts`. Enable/disable providers by commenting them out.

## 🗄️ Database

- **Prisma ORM** with PostgreSQL (easily changeable)
- **Pre-configured models** for users, accounts, sessions
- **API keys table** for building API services
- **User roles and plans** for access control

### Database Commands
```bash
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
npx prisma migrate dev   # Create and apply migrations
npx prisma studio        # Open database browser
```

## 🎨 UI Components

Built with **shadcn/ui** and **Tailwind CSS**:

- Modern, accessible components
- Dark mode support built-in
- Customizable design system
- Responsive by default

### Adding More Components
```bash
npx shadcn@latest add [component-name]
```

## 🛠️ Customization

### App Branding
- Update `NEXT_PUBLIC_APP_NAME` in `.env`
- Modify the landing page in `app/page.tsx`
- Replace logo/icons in components

### Database Schema
- Edit `prisma/schema.prisma`
- Run `npx prisma db push` to apply changes
- Update types with `npx prisma generate`

### Authentication Providers
- Configure providers in `auth.config.ts`
- Add environment variables for new providers
- Update sign-in page if needed

## 📚 Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_SECRET` | Secret for JWT signing | ✅ |
| `NEXTAUTH_URL` | Your app's URL | ✅ |
| `RESEND_API_KEY` | Resend API key for emails | ✅ |
| `EMAIL_FROM` | From email address | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | ❌ |
| `GITHUB_ID` | GitHub OAuth app ID | ❌ |
| `GITHUB_SECRET` | GitHub OAuth secret | ❌ |

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The boilerplate works on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

This boilerplate is designed to be a starting point. Feel free to:
- Add new features to your projects
- Customize the design and branding
- Extend the database schema
- Add new authentication providers

## 📖 Documentation

- **[Authentication Guide](./AUTH_GUIDE.md)** - Complete guide for authentication implementation
- **[API Examples](./templates/app/api/examples)** - Working examples of protected and public API routes
- **[Auth Helpers](./templates/lib/auth-helpers.ts)** - Server-side authentication utilities
- **[Custom Hooks](./templates/hooks/use-current-user.ts)** - Client-side authentication hooks

## 📄 License

MIT License - feel free to use this boilerplate for any project.

---

**Happy building!** 🎉

Need help? Check the [Next.js docs](https://nextjs.org/docs) and [NextAuth docs](https://authjs.dev/).