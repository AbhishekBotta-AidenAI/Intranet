# 🚀 Deployment Checklist

## ✅ Pre-Deployment Checks

### Code Quality
- [x] All TypeScript errors resolved
- [x] ESLint checks passing
- [x] All components properly imported
- [x] No console errors in development

### Functionality
- [ ] Test all navigation links
- [ ] Verify sidebar menu works
- [ ] Check mobile responsiveness
- [ ] Test all hover states
- [ ] Verify chat bot button
- [ ] Check footer links

### Content
- [ ] Replace placeholder images
- [ ] Update user information
- [ ] Customize company branding
- [ ] Update hero banner content
- [ ] Set real holiday dates
- [ ] Configure quick links

### Performance
- [ ] Optimize images (convert to WebP)
- [ ] Lazy load images
- [ ] Test loading speed
- [ ] Check bundle size

---

## 📦 Build Process

### 1. Install Dependencies
\`\`\`bash
cd Frontend
npm install
\`\`\`

### 2. Test Development Build
\`\`\`bash
npm run dev
\`\`\`
- Open http://localhost:5173
- Test all features
- Check console for errors

### 3. Run Linter
\`\`\`bash
npm run lint
\`\`\`
- Fix any linting errors

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`
- Check build output in `dist/` folder
- Verify no build errors

### 5. Preview Production Build
\`\`\`bash
npm run preview
\`\`\`
- Test production build locally
- Verify everything works

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI:
\`\`\`bash
npm install -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
cd Frontend
vercel
\`\`\`

3. Follow prompts to connect your project

**Benefits:**
- ✅ Free for personal projects
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Git integration
- ✅ Zero configuration

### Option 2: Netlify
1. Build project:
\`\`\`bash
npm run build
\`\`\`

2. Drag `dist/` folder to Netlify Drop

**Or use Netlify CLI:**
\`\`\`bash
npm install -g netlify-cli
netlify deploy
\`\`\`

### Option 3: GitHub Pages
1. Install gh-pages:
\`\`\`bash
npm install -D gh-pages
\`\`\`

2. Add to `package.json`:
\`\`\`json
{
  "homepage": "https://yourusername.github.io/your-repo",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
\`\`\`

3. Deploy:
\`\`\`bash
npm run deploy
\`\`\`

### Option 4: AWS S3 + CloudFront
1. Build project:
\`\`\`bash
npm run build
\`\`\`

2. Upload `dist/` to S3 bucket

3. Configure CloudFront distribution

4. Set up custom domain

### Option 5: Docker
1. Create `Dockerfile`:
\`\`\`dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

2. Build and run:
\`\`\`bash
docker build -t intranet-portal .
docker run -p 80:80 intranet-portal
\`\`\`

---

## 🔧 Environment Variables

If you need environment variables:

1. Create `.env` file:
\`\`\`
VITE_API_URL=https://api.yourcompany.com
VITE_APP_NAME=Aiden Nexus
\`\`\`

2. Update `vite.config.ts`:
\`\`\`typescript
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
})
\`\`\`

3. Use in code:
\`\`\`typescript
const apiUrl = import.meta.env.VITE_API_URL;
\`\`\`

---

## 📊 Performance Optimization

### 1. Image Optimization
\`\`\`bash
# Convert images to WebP
npm install -g sharp-cli
sharp -i image.png -o image.webp
\`\`\`

### 2. Code Splitting
Already configured with Vite

### 3. Lazy Loading
Add to components:
\`\`\`tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

### 4. Bundle Analysis
\`\`\`bash
npm run build -- --mode analyze
\`\`\`

---

## 🔒 Security Checklist

- [ ] Remove console.log statements
- [ ] Remove development keys/tokens
- [ ] Set up Content Security Policy
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Sanitize user inputs

---

## 📱 Testing Checklist

### Desktop Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Testing
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)

### Screen Sizes
- [ ] 320px (Small mobile)
- [ ] 768px (Tablet)
- [ ] 1024px (Desktop)
- [ ] 1920px (Large desktop)

---

## 🐛 Common Issues & Fixes

### Issue: White screen after deployment
**Fix:** Check browser console for errors. Usually a path issue.
\`\`\`typescript
// Update vite.config.ts
export default defineConfig({
  base: '/your-repo-name/', // For GitHub Pages
  // or
  base: '/', // For root domain
})
\`\`\`

### Issue: Images not loading
**Fix:** Ensure images are in `public/` folder
\`\`\`tsx
// Use absolute paths
<img src="/images/logo.png" alt="Logo" />
\`\`\`

### Issue: API calls failing
**Fix:** Check CORS configuration and API URL

### Issue: Fonts not loading
**Fix:** Verify Google Fonts import in `index.css`

---

## 📈 Post-Deployment

### 1. Set Up Analytics
\`\`\`typescript
// Add Google Analytics
// In index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
\`\`\`

### 2. Set Up Error Tracking
\`\`\`bash
npm install @sentry/react
\`\`\`

### 3. Monitor Performance
- Lighthouse CI
- WebPageTest
- GTmetrix

### 4. Set Up CI/CD
GitHub Actions example:
\`\`\`yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
\`\`\`

---

## 🎯 Success Metrics

After deployment, track:
- ✅ Page load time < 3 seconds
- ✅ Lighthouse score > 90
- ✅ Mobile usability score 100
- ✅ Zero console errors
- ✅ All features working

---

## 📞 Support

### Documentation
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)

### Community
- GitHub Issues
- Stack Overflow
- Discord communities

---

## 🎉 You're Ready!

Follow this checklist step by step, and your Aiden Nexus Intranet Portal will be live and ready to use!

**Estimated deployment time:** 15-30 minutes

Good luck! 🚀
