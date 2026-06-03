import { NextResponse } from 'next/server';
import { getAll, insert } from '@/lib/local-db';

export async function GET() {
  try {
    const data = await getAll('press_releases', 'date', false);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching press releases:', error);
    return NextResponse.json({ error: 'Failed to fetch press releases' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await insert('press_releases', body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating press release:', error);
    return NextResponse.json({ error: 'Failed to create press release' }, { status: 500 });
  }
}
