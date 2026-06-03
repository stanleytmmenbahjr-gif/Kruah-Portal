# Cornelia Backend Service

This directory contains the separated backend service for the Cornelia website.

## Features
- `/api/groq` — placeholder Groq chatbot endpoint
- `/api/contact` — message submission endpoint

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env` and add your Groq API key:
   ```bash
   cp .env.example .env
   ```

3. Start the backend:
   ```bash
   npm run dev
   ```

## Notes
- This backend folder contains an optional separate service with placeholder endpoints for `/api/groq` and `/api/contact`.
- The main frontend currently uses built-in Next.js API routes and does not depend on this service by default.
- Replace the placeholder Groq integration with real API calls in this backend if you choose to host the API separately.
