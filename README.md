# 🍽️ Servd — AI Recipe Platform

[![Next.js Engine](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS Engine](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Neon Database](https://img.shields.io/badge/Neon_DB-PostgreSQL-00E599?style=for-the-badge&logo=neon)](https://neon.tech/)
[![Strapi CMS Pipeline](https://img.shields.io/badge/Strapi-v5-2F2E6F?style=for-the-badge&logo=strapi)](https://strapi.io/)
[![Clerk Guard](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Arcjet Security](https://img.shields.io/badge/Arcjet-Secured-24A1DE?style=for-the-badge&logo=linux)](https://arcjet.com/)

**Servd** is an ultra-premium, high-contrast, AI-driven recipe generation and smart pantry management ecosystem. Engineered for modern culinary exploration, the architecture coordinates real-time data streaming across **Neon Serverless PostgreSQL** and **Strapi Headless CMS**, powered by **Google Gemini AI** orchestration. Wrapped in a luxury cinematic UI layer utilizing organic geometry and fluid micro-interactions, Servd  sets a new standard for intelligent kitchen software.

✨ **[Live Production Deployment](https://ai-recipe-platform-pi.vercel.app/)**

---


## 🚀 Installation & Local Launch


### 1. Configure Environment Variables
Create a `.env` file in your root project directory and paste the exact configuration keys listed below:

```env

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

DATABASE_URL=postgresql://neondb_owner:your_neon_password@your_neon_host.neon.tech/servdai?sslmode=require

ARCJET_KEY=your_arcjet_key

NEXT_PUBLIC_STRAPI_URL=your_strapi_url
STRAPI_API_TOKEN=your_strapi_api_token

GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### 2. Install Module Dependencies
```bash
npm install
```

### 3. Ignite the Local Sandbox Development Instances

To launch your workspace architecture locally, open your terminal tools and execute the designated platform scripts:

* **To run the Frontend Client:**
  ```bash
  npm run dev
  ```
  *App setup will initialize locally at `http://localhost:3000`*

* **To run the Headless CMS Backend Engine:**
  ```bash
  npm run develop
  ```
  *Strapi engine dashboard will initialize locally at `http://localhost:1337/admin`*
