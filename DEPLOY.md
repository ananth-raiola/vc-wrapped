# VC Wrapped — Deployment Guide

## Quick Start (Demo Mode)

The app works immediately in demo mode with sample data — no API keys needed.

```bash
cd vc-wrapped
npm install
npm run dev
# Visit http://localhost:3000 → click "Try with sample data"
```

---

## Production Setup (Real Calendar Data)

To connect real Google/Outlook calendars, you need 3 things:

### 1. Google Calendar OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (name it "VC Wrapped")
3. Go to **APIs & Services → Library** → search "Google Calendar API" → Enable it
4. Go to **APIs & Services → Credentials** → Click "Create Credentials" → "OAuth Client ID"
5. Choose "Web application"
6. Add authorized redirect URI: `https://your-domain.com/api/auth/callback/google`
   (For local dev: `http://localhost:3000/api/auth/callback/google`)
7. Copy the **Client ID** and **Client Secret**

### 2. Microsoft Outlook OAuth

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory → App Registrations → New Registration**
3. Name: "VC Wrapped", Supported account types: "Personal Microsoft accounts + Work/School"
4. Redirect URI: `https://your-domain.com/api/auth/callback/microsoft-entra-id`
   (For local dev: `http://localhost:3000/api/auth/callback/microsoft-entra-id`)
5. Go to **Certificates & Secrets → New Client Secret** → Copy the value
6. Go to **API Permissions → Add → Microsoft Graph → Delegated → Calendars.Read**
7. Copy the **Application (client) ID** and the **Client Secret**

### 3. Set Environment Variables

Create `.env.local` in the project root:

```env
AUTH_SECRET=<run: openssl rand -base64 32>

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

AUTH_URL=https://your-domain.com
```

---

## Deploy to Vercel (Recommended)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → "New Project" → Import your repo
3. Add all the environment variables from above in Vercel's project settings
4. Click "Deploy"
5. Update the redirect URIs in Google/Microsoft to use your Vercel domain

That's it — your VC Wrapped is live.

---

## Project Structure

```
app/page.tsx          → Landing page
app/dashboard/page.tsx → Analytics dashboard
app/wrapped/page.tsx   → Shareable Wrapped card
app/api/auth/          → OAuth authentication
app/api/calendar/      → Calendar data fetching
lib/stats.ts           → Statistics computation
lib/analyze.ts         → Meeting categorization
lib/sample-data.ts     → Demo data generator
components/charts/     → All chart components
components/WrappedCard.tsx → The viral shareable card
```
