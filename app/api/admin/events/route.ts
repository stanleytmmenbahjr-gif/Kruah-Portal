import { NextResponse } from 'next/server';
import { getAll, insert } from '@/lib/local-db';

export async function GET() {
  try {
    const data = await getAll('events', 'date', false);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: error?.message ?? 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await insert('events', body);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: error?.message ?? 'Failed to create event' }, { status: 500 });
  }
}