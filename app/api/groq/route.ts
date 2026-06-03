import { NextResponse } from 'next/server';
import { askGroq } from '@/lib/groq-client';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const answer = await askGroq(message);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Groq API error:', error);
    const message = error instanceof Error ? error.message : 'Unable to process request';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
