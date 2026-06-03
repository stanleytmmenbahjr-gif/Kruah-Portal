import { NextResponse } from 'next/server';
import { getAdminSupabase, handleMissingTable } from '@/lib/supabase-admin';

const supabase = getAdminSupabase();

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('testimonials')
      .insert([body])
      .select()
      .single();

    if (error) {
      const recovered = await handleMissingTable('testimonials', async () =>
        await supabase.from('testimonials').insert([body]).select().single()
      );
      return NextResponse.json(recovered);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}