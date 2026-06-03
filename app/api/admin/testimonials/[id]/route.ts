import { NextResponse } from 'next/server';
import { getAdminSupabase, handleMissingTable } from '@/lib/supabase-admin';

const supabase = getAdminSupabase();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('testimonials')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      const recovered = await handleMissingTable('testimonials', async () =>
        await supabase.from('testimonials').update(body).eq('id', id).select().single()
      );
      return NextResponse.json(recovered);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const { id } = await params;
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      await handleMissingTable('testimonials', async () =>
        await supabase.from('testimonials').delete().eq('id', id)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}