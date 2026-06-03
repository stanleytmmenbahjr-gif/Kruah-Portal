import { NextResponse } from 'next/server';
import { getAll, insert } from '@/lib/local-db';

export async function GET() {
  try {
    const data = await getAll('roles', 'created_at', false);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching roles:', error);
    return NextResponse.json({ error: error?.message ?? 'Failed to fetch roles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.title || !body.organization || !body.start_date) {
      return NextResponse.json({ error: 'Missing required fields: title, organization, start_date' }, { status: 400 });
    }

    const data = await insert('roles', body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error creating role:', error);
    return NextResponse.json({ error: error?.message ?? 'Unexpected server error', details: String(error) }, { status: 500 });
  }
}