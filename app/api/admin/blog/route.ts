import { NextResponse } from 'next/server';
import { getAll, insert } from '@/lib/local-db';

export async function GET() {
  try {
    const data = await getAll('blog_posts', 'published_at', false);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await insert('blog_posts', body);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}