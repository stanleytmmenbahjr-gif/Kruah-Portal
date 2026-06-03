import { NextResponse } from 'next/server';
import { getContactMessages } from '../../../../lib/message-store';

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Unable to fetch messages' }, { status: 500 });
  }
}
