# Cornelia Wonkerleh Kruah Personal Brand Website

A premium personal brand site scaffolded in Next.js 15, Tailwind CSS, Supabase, and Groq integration.

## Frontend Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with the required environment variables:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL_NAME=openai/gpt-oss-20b
   GROQ_BASE_URL=https://api.groq.com/openai/v1
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_DB_URL=postgres://your-db-user:password@db-host:5432/postgres
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   RESEND_API_KEY=re_your_actual_api_key_here
   RESEND_AUDIENCE_ID=your_actual_audience_id_here
   ```

   If you set `SUPABASE_DB_URL`, the admin API can automatically create missing tables like `press_releases` when the first request runs.3. Start the frontend:
   ```bash
   npm run dev
   ```

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
