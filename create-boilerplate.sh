#!/bin/bash

# NextUp - Next.js Boilerplate Creator
# Creates a complete Next.js project with auth, shadcn/ui, and Tailwind

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_NAME=${1:-"my-nextjs-app"}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$SCRIPT_DIR/templates"

echo -e "${BLUE}🚀 NextUp - Creating Next.js Project: ${PROJECT_NAME}${NC}"
echo -e "${YELLOW}This includes: NextAuth, shadcn/ui, Tailwind, Prisma, TypeScript${NC}"
echo ""

# Check if template directory exists
if [ ! -d "$TEMPLATE_DIR" ]; then
  echo -e "${RED}❌ Template directory not found: ${TEMPLATE_DIR}${NC}"
  exit 1
fi

# Create Next.js project
echo -e "${GREEN}📦 Creating Next.js project...${NC}"
npx create-next-app@latest $PROJECT_NAME \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --eslint \
  --no-turbopack

cd $PROJECT_NAME

# Install dependencies
echo -e "${GREEN}📚 Installing dependencies...${NC}"
npm install \
  next-auth@5.0.0-beta.21 \
  @auth/prisma-adapter \
  @prisma/client \
  prisma \
  nanoid \
  lucide-react \
  clsx \
  tailwind-merge \
  class-variance-authority \
  @radix-ui/react-label \
  @radix-ui/react-separator \
  @radix-ui/react-slot \
  tailwindcss-animate

# Copy template files
echo -e "${GREEN}📋 Copying template files...${NC}"

# Copy configuration files
cp "$TEMPLATE_DIR/package.json" "./package.json.template"
cp "$TEMPLATE_DIR/tailwind.config.ts" "./tailwind.config.ts"
cp "$TEMPLATE_DIR/components.json" "./components.json"
cp "$TEMPLATE_DIR/next.config.js" "./next.config.js"
cp "$TEMPLATE_DIR/tsconfig.json" "./tsconfig.json"
cp "$TEMPLATE_DIR/postcss.config.js" "./postcss.config.js"

# Copy auth files
cp "$TEMPLATE_DIR/auth.ts" "./auth.ts"
cp "$TEMPLATE_DIR/auth.config.ts" "./auth.config.ts"

# Copy environment file
cp "$TEMPLATE_DIR/env.example" "./.env.example"

# Copy Prisma schema
mkdir -p prisma
cp "$TEMPLATE_DIR/schema.prisma" "./prisma/schema.prisma"

# Copy lib files
mkdir -p lib
cp "$TEMPLATE_DIR/lib/db.ts" "./lib/db.ts"
cp "$TEMPLATE_DIR/lib/utils.ts" "./lib/utils.ts"

# Copy app files (replace existing)
rm -rf app
cp -r "$TEMPLATE_DIR/app" "./app"

# Copy components
cp -r "$TEMPLATE_DIR/components" "./components"

# Install dependencies from updated package.json
echo -e "${GREEN}🔄 Installing updated dependencies...${NC}"
npm install

# Generate Prisma client
echo -e "${GREEN}🔧 Generating Prisma client...${NC}"
npx prisma generate

echo -e "${GREEN}✅ NextUp project created successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Copy .env.example to .env and configure your environment variables"
echo "2. Set up your database URL in .env"
echo "3. Run: npx prisma db push (or npx prisma migrate dev)"
echo "4. Run: npm run dev"
echo ""
echo -e "${BLUE}🔑 Authentication providers included:${NC}"
echo "  - Email magic links (Resend)"
echo "  - Google OAuth"
echo "  - GitHub OAuth"
echo ""
echo -e "${BLUE}📱 Pages created:${NC}"
echo "  - Landing page (/) "
echo "  - Dashboard (/dashboard)"
echo "  - Sign in (/auth/signin)"
echo "  - Auth verification (/auth/verify-request)"
echo "  - Auth error (/auth/error)"
echo ""
echo -e "${BLUE}Happy coding! 🎉${NC}"