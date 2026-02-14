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
   - Upload/Push these files to the repository.

2. **Setup Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **Add New** > **Project**.
   - Select your GitHub repository.

3. **Configure Environment Variables**:
   - In the Vercel project configuration page, find **Environment Variables**.
   - Add the following variable:
     - **Key**: `API_KEY`
     - **Value**: `[PASTE_YOUR_GOOGLE_GEMINI_API_KEY_HERE]`

4. **Deploy**:
   - Click **Deploy**. Vercel will build the app and provide a live URL within a minute.

### Option 2: Deploy to Netlify

1. **Setup Netlify**:
   - Log in to [netlify.com](https://netlify.com).
   - Click **Add new site** > **Import from Git**.
   - Connect to GitHub and select your repository.

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

3. **Configure Environment Variables**:
   - Click **Show advanced** > **New Variable**.
   - **Key**: `API_KEY`
   - **Value**: `[PASTE_YOUR_GOOGLE_GEMINI_API_KEY_HERE]`

4. **Deploy**:
   - Click **Deploy Site**.

## Security Note
This application requires an API Key to function. By using Environment Variables (`process.env.API_KEY`) on Vercel/Netlify, your key is not hardcoded in the source code. However, since this is a client-side application, the key is used in the browser. For a fully production-grade commercial application, you should move the API calls to a backend server.
