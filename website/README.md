# ဓမ္မရေချမ်း (Dhamma Yay Chan) - Landing Website

A modern, fast, and responsive static landing website for the **ဓမ္မရေချမ်း (Dhamma Yay Chan)** mobile application (available for Android & iOS). Designed with Tailwind CSS, Lucide Icons, and React + Vite, ready for 1-click static deployment on **Vercel**.

---

## 🌟 Key Features

- **Hero & App Showcase**: Engaging headline, Myanmar tagline, feature highlights, and interactive mobile device mockup.
- **Direct Downloads**:
  - **Android**: Direct `.apk` download button with version tag and file size badge (`107 MB`).
  - **iOS**: Apple App Store "Coming Soon" badge with informative status modal.
- **Interactive App Preview**: Tabbed showcase displaying real application screenshots (Home Dashboard, Floating Bead Counter, Offline Chanting Player, iOS view).
- **What's New / Version Updates**: Categorized changelog with release date, version `v1.0.0`, new features, and technical fixes.
- **About Developer / Team**: Mission statement, philosophy of 100% free & ad-free Dhamma propagation, and contact details.
- **Support & Donation**: Dedicated section for supporters with one-click copyable account numbers for **KBZPay**, **WavePay**, **PayPal**, and **Buy Me a Coffee**.
- **Interactive Feedback Form**: Form with rating stars, category selectors (Feature Request, Bug Report, Text Correction), and submission confirmation + direct mailto fallback.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom glassmorphism and golden glow gradients
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) and [Padauk / Noto Sans Myanmar](https://fonts.google.com/noto/specimen/Noto+Sans+Myanmar)
- **Deployment**: Static SPA architecture with `vercel.json` optimized for [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
website/
├── index.html              # HTML shell with Google Fonts & OpenGraph SEO tags
├── package.json            # Scripts and dependencies
├── postcss.config.js       # PostCSS config for Tailwind
├── tailwind.config.js      # Custom theme colors, glows, animations
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel static rewrites and cache headers
├── vite.config.ts          # Vite configuration
├── public/                 # Static public assets
│   ├── favicon.png         # Browser favicon
│   ├── logo.png            # Official Golden Logo
│   ├── screenshots/        # High-res app preview screenshots
│   └── downloads/          # Direct downloadable APK releases
└── src/
    ├── App.tsx             # Root component assembling all sections
    ├── index.css           # Tailwind directives & glassmorphic utilities
    ├── main.tsx            # React application entry point
    ├── data/
    │   └── appData.ts      # Centralized app info, features, changelog & donation accounts
    └── components/
        ├── Navbar.tsx      # Sticky glassmorphic navbar with mobile menu
        ├── Hero.tsx        # Hero banner with APK download & device frame
        ├── Features.tsx    # 6-card feature grid with Lucide icons
        ├── AppPreview.tsx  # Interactive screenshot tab switcher
        ├── VersionUpdates.tsx # Version history & changelog
        ├── Developer.tsx   # Team bio & core values
        ├── Donate.tsx      # Support cards with one-click copy
        ├── FeedbackForm.tsx# Feedback form with rating & submit toast
        └── Footer.tsx      # Footer with sacred proverbs & links
```

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
```bash
cd website
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
This produces a production-ready, minified static build inside the `website/dist/` directory.

### 4. Preview the Production Build Locally
```bash
npm run preview
```

---

## 🚢 Deploying to Vercel

### Option 1: Vercel Web Dashboard (Recommended)

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. In the **Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Vercel will build and assign you a fast global CDN domain (e.g. `https://dhamma-yay-chan.vercel.app`).

### Option 2: Deploying via Vercel CLI

From the `website/` directory:
```bash
cd website

# Log in to Vercel (if not already logged in)
npx vercel login

# Deploy preview
npx vercel

# Deploy directly to production
npx vercel --prod
```

> **Note regarding large files (> 100 MB):**  
> If deploying via GitHub and your release APK is larger than 100MB, consider hosting the `.apk` on **GitHub Releases** and pointing `apkDownloadUrl` in `src/data/appData.ts` to the GitHub release URL (e.g. `https://github.com/your-username/dharma-app/releases/download/v1.0.0/dhamma-yay-chan-v1.0.0.apk`).

---

## ⚙️ Customization Guide

All app metadata, features, changelogs, and donation accounts are neatly centralized in **[`src/data/appData.ts`](file:///Users/m4/projects/dharma-app/website/src/data/appData.ts)**:

- **Update Version / Download URL**: Change `APP_INFO.version` or `APP_INFO.apkDownloadUrl`.
- **Add New Features**: Edit the `FEATURES` array.
- **Add Future Releases**: Append entries to the `CHANGELOG` array.
- **Update Donation Numbers**: Edit the `DONATION_OPTIONS` array (KBZPay, WavePay, etc.).
- **Update Contact Email**: Change `APP_INFO.developerEmail`.

---

## 📜 License & Merits

Dedicated for the propagation of the Buddha Sasana.  
MIT License — 100% Free, Ad-Free, and Open.
