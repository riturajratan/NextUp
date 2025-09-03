# Deploy NextUp to GitHub

This guide shows you how to deploy NextUp documentation to GitHub Pages and set up as a template repository.

## 🌐 Deploy Documentation to GitHub Pages

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/riturajratan/NextUp.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy the `docs/` folder

### 3. Access Your Site
Your documentation will be available at:
```
https://riturajratan.com/NextUp/
```

## 🎯 Use as GitHub Template

### Make Your Repository a Template

1. Go to your NextUp repository on GitHub
2. Click **Settings**
3. Check **✓ Template repository**
4. Save changes

### Users Can Now:

#### Option 1: Use Template Button
1. Visit `https://github.com/riturajratan/NextUp`
2. Click **"Use this template"** button
3. Create a new repository with all NextUp files

#### Option 2: Direct Link
Share this link for one-click setup:
```
https://github.com/riturajratan/NextUp/generate
```

#### Option 3: Clone and Run Script
```bash
git clone https://github.com/riturajratan/NextUp.git
cd NextUp
./create-boilerplate.sh my-app
```

## 📝 Customize Landing Page

Edit `docs/index.html` and replace:
- `yourusername` with your GitHub username
- Update social links
- Customize colors and branding
- Add your own features

## 🚀 Quick Deploy Steps

### For Repository Owner:
1. Fork/Clone this repository
2. Push to your GitHub account
3. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
4. Make it a template repository (Settings → Template repository)
5. Share the link!

### For Users:
1. Visit the landing page
2. Click "Use GitHub Template" or "Get Started"
3. Follow the 2-minute setup
4. Start building!

## 📊 Track Usage

Add these to see how many people use your template:
- GitHub stars counter
- Fork counter
- Clone analytics (in Insights)

## 🎨 Customization Ideas

### Add Demo Video
```html
<video controls class="w-full rounded-lg shadow-xl">
  <source src="demo.mp4" type="video/mp4">
</video>
```

### Add Live Demo Link
```html
<a href="https://nextup-demo.vercel.app" target="_blank">
  View Live Demo →
</a>
```

### Add Testimonials
```html
<section class="testimonials">
  <blockquote>
    "NextUp saved me days of setup time!"
    - Happy Developer
  </blockquote>
</section>
```

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Templates](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

## 💡 Pro Tips

1. **Custom Domain**: Add a CNAME file in `docs/` for custom domain
2. **Analytics**: Add Google Analytics or Plausible to track visits
3. **SEO**: Update meta tags in index.html for better search visibility
4. **Social Image**: Add an Open Graph image for social media shares

---

Ready to share NextUp with the world! 🚀