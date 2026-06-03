# Cornelia Wonkerleh Kruah Personal Brand Website

A premium personal brand site scaffolded in Next.js 15, Tailwind CSS, Supabase, and Groq integration.

## Frontend Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with the required environment variables. Use `.env.example` as a template.
   ```bash
   cp .env.example .env.local
   ```

   Update the values with your own secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_DB_URL`
   - `RESEND_API_KEY`
   - `RESEND_AUDIENCE_ID`
   - `CONTACT_NOTIFICATION_EMAIL`
   - `GROQ_API_KEY`
   - `GROQ_MODEL_NAME`
   - `GROQ_BASE_URL`
   - `ADMIN_PASSWORD`

   If you set `SUPABASE_DB_URL`, the admin API can automatically create missing tables like `press_releases` when the first request runs.
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Vercel Deployment

This repository is ready to deploy on Vercel as a Next.js app. The root `package.json` and `vercel.json` ensure Vercel uses the Next.js builder.

### Deployment steps

1. Push this repo to your Git provider.
2. Create a new project in Vercel and connect the repo.
3. In Vercel project settings, add the required environment variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_DB_URL`
   - `RESEND_API_KEY`
   - `RESEND_AUDIENCE_ID`
   - `CONTACT_NOTIFICATION_EMAIL`
   - `GROQ_API_KEY`
   - `GROQ_MODEL_NAME`
   - `GROQ_BASE_URL`
   - `ADMIN_PASSWORD`
4. Deploy on Vercel. The build command is `npm run build` and the output is handled automatically by Next.js.

### Notes for Vercel

- The optional `backend/` folder is not part of the Vercel deployment and is ignored via `.vercelignore`.
- Do not commit `.env.local` or secret values. Vercel environment variables are configured in the Vercel dashboard.

## Project Structure

- `app/` — Next.js app router pages and frontend components
- `components/` — reusable frontend UI modules
- `backend/` — optional separate backend service with placeholder API routes
- `lib/` — reusable frontend clients and helpers
- `types/` — TypeScript types for content models

## Newsletter Setup (Resend API)

1. Create a [Resend](https://resend.com) account
2. Get your API key from the [API Keys](https://resend.com/api-keys) page
3. Create an [Audience](https://resend.com/audiences) for newsletter subscribers
4. Add to your `.env.local` file:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_AUDIENCE_ID=your_actual_audience_id_here
   ```
5. Configure your domain in Resend for sending emails
6. Update the welcome email template in `/app/api/newsletter/route.ts` as needed

## Admin Dashboard Removed

This project no longer includes a public admin dashboard. Content management is handled through the site code or direct data updates.

### Database Configuration
1. Set up your Supabase project and create the required tables (see schema below)
2. Update `.env.local` with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
3. The dashboard will automatically connect and allow content management

### Supabase Tables Required
- `roles` - Current and past positions
- `testimonials` - Client and partner endorsements

## Notes

- The frontend uses built-in Next.js API routes under `/api/`.
- The optional `backend/` folder contains a separate legacy backend service with placeholder endpoints.
- The Groq integration in `/app/api/groq/route.ts` uses `lib/groq-client.ts` and requires `GROQ_API_KEY`.
