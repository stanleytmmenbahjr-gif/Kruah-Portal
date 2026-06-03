# Cornelia Wonkerleh Kruah Personal Brand Website - Project Instructions

**Project Duration:** May 11 - May 18, 2026 (7 days)  
**Approach:** Phased MVP-first, then premium features  

---

## Executive Overview

Build a premium, presidential personal brand website for Cornelia Wonkerleh Kruah—a Liberian lawyer, politician, political economist, digital creator, and national leader. The website serves as a digital leadership portfolio, media hub, political advocacy platform, and speaking/collaboration gateway.

**Inspiration:**
- https://alphiaofafrica.com/ — clean modern hero, layered glass cards, premium gradient panels, bold leadership statements
- https://www.alxafrica.com/ — elegant typography, strong CTA layout, structured content sections, polished corporate presence

**Tech Stack:**
- **Frontend:** Next.js 15, React, Tailwind CSS, Shadcn UI
- **Animations:** Framer Motion, GSAP
- **Backend:** Supabase (PostgreSQL)
- **AI/Chatbot:** Groq API (with LLaMA 70B or Mixtral 8x7B)
- **Deployment:** Vercel
- **CMS:** Content managed via Supabase + Next.js API Routes

---

## Phase 1: MVP (Deadline: May 16)

### Core Sections (Inspired by ALX Africa & Alphia)
1. **Hero Section** - Presidential introduction with animated gradient background, clear CTA ("Explore Leadership")
2. **Leadership Pathways** - 3-4 key focus areas (e.g., "Governance", "Youth Empowerment", "Legal Excellence", "Political Innovation") with cards
3. **Impact in Action** - Animated counters showing key statistics (years in service, communities impacted, youth mentored, laws influenced)
4. **Biography** - Professional overview with gradient background and profile imagery
5. **Current Roles** - Visual cards for each position with organization logos
6. **Testimonials & Impact Stories** - Video testimonials, stacked profile images (like ALX Africa style)
7. **Contact & Collaboration** - Lead capture form with newsletter subscription
8. **Groq AI Assistant** - Context-aware chatbot widget in bottom-right corner

### Technical Setup
- Initialize Next.js 15 project with TypeScript
- Configure Tailwind CSS + Shadcn UI
- Setup Supabase project (Tables: roles, timeline_events, testimonials, blog_posts, events)
- Implement Groq API integration with Next.js API routes
- Configure Vercel deployment

### Design Specs (Inspired by ALX Africa)
- **Color Palette:** Deep charcoal (#1a1a1a), Gold (#d4af37), Elegant white (#f5f5f5), soft gradients (navy-to-purple, gold fades)
- **Typography:** Playfair Display (hero/headings - bold, presidential), Inter (body - clean, readable), Poppins (UI elements)
- **Hero:** Large gradient background with animated overlay, clear CTA button
- **Cards:** Glassmorphism effect with hover animations, shadow depths
- **Statistics Section:** Counter animations using GSAP with stacked avatars (profile images)
- **Testimonials:** Video embeds with profile stacks like ALX (overlapping circular images)
- **Navigation:** Sticky header, minimal, with clear logo and menu
- **Mobile-first responsive design:** Hamburger menu, stacked sections, touch-optimized buttons
- **Animations:** Subtle scroll triggers, smooth page transitions, hover effects on interactive elements

### Groq AI Features (MVP)
- Trained on Cornelia's background data
- Responds to:
  - Questions about her career and roles
  - Policy insights on governance and youth empowerment
  - Speaking availability and collaboration opportunities
  - FAQs about her initiatives
- Context window: 4k tokens (sufficient for background info + question)

---

## Phase 2: Full Features (After MVP Launch)

### Additional Sections
1. **Leadership Journey Timeline** - Expanded interactive timeline with visuals
2. **Government & Political Roles** - Detailed role descriptions
3. **Legal Career** - Cases, publications, expertise areas
4. **Advocacy & Community Impact** - Impact metrics and stories
5. **Women & Youth Empowerment** - Dedicated hub
6. **Gallery & Media** - Photo/video portfolio (images stored in Supabase/Cloudinary)
7. **Press & Interviews** - Media kit and coverage
8. **Blog & Insights** - Thought leadership articles
9. **Events & Speaking** - Event calendar with booking system
10. **Testimonials** - Client/partner endorsements
11. **Social Media Integration** - Embedded feeds (Twitter, LinkedIn, Instagram)

### Premium Features
- **Event Booking System** - Calendar integration, automated confirmations
- **Newsletter Subscription** - Email list management (Resend API)
- **Admin Dashboard** - Removed
- **Dark/Light Mode** - Theme toggle with persistent storage
- **Dynamic image gallery** - Lazy loading, lightbox effects
- **Animated counters** - Leadership impact statistics
- **AI-Powered chatbot enhancements** - Multi-language support, context awareness
- **SEO optimization** - Meta tags, structured data, sitemaps
- **Accessibility** - WCAG 2.1 AA compliance

---

## Project Structure

```
cornelia-website/
├── app/
│   ├── page.tsx (Hero + About)
│   ├── timeline/ (Leadership journey)
│   ├── roles/ (Government & legal)
│   ├── advocacy/ (Impact hub)
│   ├── gallery/ (Media portfolio)
│   ├── blog/ (Thought leadership)
│   ├── events/ (Speaking & events)
│   ├── contact/ (Contact form)
│   ├── api/
│   │   ├── groq/ (Chatbot endpoint)
│   │   ├── blog/ (Blog CRUD)
│   │   ├── events/ (Events CRUD)
│   │   └── testimonials/ (Testimonials CRUD)
│   └── layout.tsx (Global layout)
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Timeline.tsx
│   ├── Roles.tsx
│   ├── Chatbot.tsx
│   ├── Gallery.tsx
│   ├── Newsletter.tsx
│   └── (other shared components)
├── lib/
│   ├── supabase.ts (Client)
│   ├── groq-client.ts (Groq integration)
│   └── utils.ts
├── public/
│   ├── images/ (Brand assets, photos)
│   └── videos/ (Testimonials, content)
├── styles/
│   └── globals.css (Tailwind config)
├── types/
│   └── index.ts (TypeScript interfaces)
└── .env.local (Secrets: Supabase, Groq API key)
```

---

## Supabase Database Schema

### Tables

**roles** (Current positions)
- id (UUID, PK)
- title (text) - e.g., "Minister of Youth and Sports"
- organization (text)
- start_date (date)
- end_date (date, nullable)
- is_current (boolean)
- description (text)
- category (enum: government, legal, political, nonprofit)
- created_at (timestamp)

**timeline_events** (Career milestones)
- id (UUID, PK)
- title (text)
- date (date)
- description (text)
- category (enum: education, career, government, advocacy)
- image_url (text, nullable)
- created_at (timestamp)

**blog_posts** (Articles)
- id (UUID, PK)
- title (text)
- slug (text, unique)
- content (text)
- excerpt (text)
- author (text)
- published_at (timestamp)
- featured_image (text, nullable)
- tags (text[])
- created_at (timestamp)

**events** (Speaking & collaboration)
- id (UUID, PK)
- title (text)
- description (text)
- date (timestamp)
- location (text)
- event_type (enum: speaking, collaboration, conference)
- registration_link (text, nullable)
- capacity (int, nullable)
- created_at (timestamp)

**testimonials** (Endorsements)
- id (UUID, PK)
- name (text)
- title (text)
- organization (text)
- content (text)
- image_url (text, nullable)
- created_at (timestamp)

---

## Groq AI Assistant Implementation

### Setup
1. Get Groq API key from https://console.groq.com
2. Store in `.env.local`: `GROQ_API_KEY=...`
3. Use LLaMA 70B or Mixtral 8x7B model

### Context Document
Create a context/knowledge base with:
- Full biography and career history
- Key policy positions and advocacy areas
- Speaking topics and expertise
- Contact information and availability
- Link to Supabase data (roles, timeline, blog, events)

### API Route (`/api/groq`)
- Accepts POST requests with user message
- Includes system prompt with Cornelia's background
- Enforces safety guardrails (no political manipulation, maintains professionalism)
- Returns streaming response for better UX

### Frontend Integration
- Fixed chatbot widget (bottom-right corner)
- Minimizable/expandable
- Message history in session
- Loading states and error handling
- Dark/light mode compatible

---

## Groq AI System Prompt Template

```
You are an intelligent assistant representing Cornelia Wonkerleh Kruah, 
a Liberian lawyer, politician, political economist, and national leader.

Background: [Insert full biography]
Current Roles: [Pull from Supabase roles table]
Key Initiatives: Youth empowerment, women's leadership, governance innovation
Expertise Areas: Law, public policy, African development, digital inclusion

Guidelines:
- Always speak professionally and authentically in Cornelia's voice
- Provide substantive, well-informed responses
- If asked about topics outside your knowledge, acknowledge and redirect
- Promote youth empowerment and positive change
- Never make commitments beyond what's publicly stated
- For availability/booking requests, direct to contact form

Format responses clearly and engagingly.
```

---

## Implementation Roadmap (May 11-18)

### Day 1-2 (May 11-12)
- [ ] Initialize Next.js 15 project
- [ ] Setup Supabase project and schema
- [ ] Configure Tailwind CSS + Shadcn UI
- [ ] Setup environment variables
- [ ] Create base layout and design system

### Day 2-3 (May 12-13)
- [ ] Build Hero section with animations
- [ ] Build About/Biography section
- [ ] Implement current roles display
- [ ] Create interactive Timeline component

### Day 3-4 (May 13-14)
- [ ] Setup Groq API integration
- [ ] Build AI chatbot component
- [ ] Implement chatbot UI with Framer Motion
- [ ] Test Groq responses

### Day 4-5 (May 14-15)
- [ ] Build Contact form with validation
- [ ] Implement basic CRUD for blog/events/testimonials
- [ ] Setup Vercel deployment

### Day 5-6 (May 15-16)
- [ ] Content population (sample data into Supabase)
- [ ] Mobile responsiveness audit
- [ ] SEO optimization (meta tags, structured data)
- [ ] Performance optimization

### Day 6-7 (May 16-18)
- [ ] Testing and bug fixes
- [ ] Accessibility audit
- [ ] Final design polish
- [ ] Launch and monitoring

---

## Environment Variables (.env.local)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Groq
GROQ_API_KEY=your_groq_api_key

# Deployment
NEXT_PUBLIC_BASE_URL=https://cornelia-wonkerleh.com (or staging URL)
```

---

## Key Dependencies & Packages

### Core
- next@15.0.0
- react@19
- typescript

### Styling & UI
- tailwindcss
- shadcn-ui
- @radix-ui/dialog (for modal components)
- @radix-ui/dropdown-menu

### Animations
- framer-motion
- gsap
- react-scroll-trigger (optional)

### Backend & Database
- @supabase/supabase-js
- @supabase/auth-helpers-nextjs

### AI & API
- groq-sdk

### Forms & Validation
- react-hook-form
- zod

### Media & SEO
- next-image-export-optimizer
- next-seo

---

## Design Tokens

### Colors
```
Primary Gold: #d4af37
Dark Charcoal: #1a1a1a
Elegant White: #f5f5f5
Accent Gray: #4a4a4a
Success: #10b981
Error: #ef4444
```

### Typography
```
Hero: Playfair Display 72px, Weight 700
Headings: Playfair Display 36-48px, Weight 600
Body: Inter 16px, Weight 400
UI: Poppins 14px, Weight 500
```

### Spacing & Breakpoints
```
Mobile: 320px - 640px
Tablet: 641px - 1024px
Desktop: 1025px+
Spacing: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64)
```

---

## Deployment Checklist

- [ ] Vercel project connected to GitHub repo
- [ ] Environment variables configured in Vercel dashboard
- [ ] Domain configured (or temporary URL ready)
- [ ] SSL/TLS certificate auto-configured
- [ ] Analytics enabled (Vercel Web Analytics)
- [ ] Error tracking setup (optional: Sentry)
- [ ] Staging environment for testing
- [ ] Production environment with proper safeguards

---

## Post-Launch Optimization (Phase 2+)

1. **Content Expansion** - Add more blog posts, testimonials, case studies
2. **Event Management** - Integrate event booking and calendar sync
3. **Media Gallery** - High-quality photography and video integration
4. **Advanced Analytics** - Track visitor behavior and engagement
5. **Email Marketing** - Newsletter automation with Resend or Mailchimp
6. **Multi-language Support** - Add French translation (common in Liberia)
7. **Mobile App** - React Native companion app (future)

---

## Success Metrics

- Page load time < 3s (target: < 1.5s on desktop)
- Mobile responsiveness: 100% across iOS/Android
- SEO score: 90+ (Google PageSpeed Insights)
- Accessibility: WCAG 2.1 AA compliance
- Chatbot engagement: 50%+ visitor interaction rate
- Conversion rate: 5%+ contact form submissions
- Uptime: 99.9%+ availability

---

## Important Notes

1. **Content Authenticity** - All biographical information should be verified and accurate
2. **Brand Consistency** - Maintain professional, presidential tone throughout
3. **Compliance** - Ensure all policy statements are vetted
4. **Privacy** - Implement proper data handling for contact forms (GDPR/CCPA)
5. **Maintenance Plan** - Assign responsibility for content updates post-launch
6. **Backup Strategy** - Regular Supabase backups

---

**Document Version:** 1.0  
**Last Updated:** May 11, 2026  
**Next Review:** After MVP Launch (May 16)