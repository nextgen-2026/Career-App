# AI Life Decision Simulator

A comprehensive React Application powered by Google Gemini API to help Indian students make informed career decisions.

## Features
- **Student Profile Analysis**: Tailored for School and College students.
- **Personalized Roadmap**: Step-by-step career guidance.
- **Resource Links**: Curated links to courses, exams (JEE/GATE), and tutorials.
- **Weekly Schedule**: Actionable study plans.
- **100% Secure**: Client-side execution with environment variable protection for API keys.

## Deployment Instructions

### Prerequisites
1. A GitHub account.
2. A Vercel or Netlify account.
3. A Google Gemini API Key.

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Upload all files (including `package.json` and `vite.config.ts`) to the repository.

2. **Setup Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New** > **Project**.
   - Select your GitHub repository.
   - Vercel should automatically detect "Vite" as the framework.

3. **Configure Environment Variables (IMPORTANT)**:
   - In the Vercel project configuration page, find **Environment Variables**.
   - You MUST name the variable `VITE_API_KEY`.
     - **Key**: `VITE_API_KEY`
     - **Value**: `[PASTE_YOUR_GOOGLE_GEMINI_API_KEY_HERE]`
   - *Note: If you name it just API_KEY, it will not work.*

4. **Deploy**:
   - Click **Deploy**.

### Option 2: Deploy to Netlify

1. **Setup Netlify**:
   - Log in to [netlify.com](https://netlify.com).
   - Click **Add new site** > **Import from Git**.
   - Connect to GitHub and select your repository.

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

3. **Configure Environment Variables**:
   - Click **Show advanced** > **New Variable**.
   - **Key**: `VITE_API_KEY`
   - **Value**: `[PASTE_YOUR_GOOGLE_GEMINI_API_KEY_HERE]`

4. **Deploy**:
   - Click **Deploy Site**.
