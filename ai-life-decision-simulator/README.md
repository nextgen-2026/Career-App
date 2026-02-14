# AI Life Decision Simulator

A comprehensive React Application powered by Google Gemini API to help Indian students make informed career decisions.

## Features
- **Student Profile Analysis**: Tailored for School and College students.
- **Personalized Roadmap**: Step-by-step career guidance.
- **Resource Links**: Curated links to courses, exams (JEE/GATE), and tutorials.
- **Weekly Schedule**: Actionable study plans.
- **100% Secure**: Client-side execution with environment variable protection for API keys.

## 🚀 Deployment Instructions (Vercel)

Follow these steps EXACTLY to deploy your app successfully.

### 1. Push to GitHub
1. Create a new repository on GitHub.
2. Upload all files (including `package.json`, `vite.config.ts`, `index.html`, etc.) to this repository.

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New** > **Project**.
3. Select your **AI Life Decision Simulator** repository from GitHub.
4. Vercel will detect it as a **Vite** project.

### 3. Add Environment Variable (CRITICAL)
Before clicking deploy, you must add your API Key:

1. On the "Configure Project" screen, look for **Environment Variables**.
2. **Key**: `VITE_API_KEY` (Must be exactly this name).
3. **Value**: `[Your Actual Google Gemini API Key]`
4. Click **Add**.

### 4. Deploy
1. Click **Deploy**.
2. Wait for the confetti! 🎉

---

## ⚠️ Troubleshooting

**If you see an error saying "API Key is missing":**
1. Go to your Vercel Project Dashboard.
2. Click **Settings** > **Environment Variables**.
3. Check if `VITE_API_KEY` is present.
4. If you added it *after* the initial deployment, go to the **Deployments** tab, click the three dots (`...`) next to the top deployment, and select **Redeploy**.

**If you see a 404 Error:**
The app is configured to use `gemini-1.5-flash`. Ensure your API key is active and has billing enabled (even for the free tier).
