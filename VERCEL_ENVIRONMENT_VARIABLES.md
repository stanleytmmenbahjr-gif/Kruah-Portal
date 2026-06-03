# Vercel Environment Variables

Use this file as a reference when configuring your Vercel project.
Copy the secret values from `.env.local` into the Vercel dashboard.

## Required Variables

- `GROQ_API_KEY`
- `GROQ_BASE_URL`
- `GROQ_MODEL_NAME`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_DB_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `CONTACT_NOTIFICATION_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

## Notes

- `SUPABASE_SERVICE_ROLE_KEY` is currently empty in `.env.local`; add your Supabase service role key if your admin endpoints require it.
- `RESEND_AUDIENCE_ID` is currently a placeholder; update it with your actual Resend audience ID.
- Do not commit `.env.local` or any secret values to your repo.
- Vercel uses the values configured in the project settings, not the local file.
