import { NextResponse } from 'next/server';
import { getSupabase } from '../../../../../lib/supabase';
import { ensureTableExists, handleMissingTable } from '../../../../../lib/supabase-admin';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from('contact_messages')
      .update(body)
      .eq('id', id)
      .select();

    if (error) {
      if (error.code === 'PGRST205') {
        await ensureTableExists('contact_messages');
        const retry = await supabase.from('contact_messages').update(body).eq('id', id).select();
        if (retry.error) {
          console.error('Supabase error:', retry.error);
          return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
        }
        return NextResponse.json(retry.data);
      }

      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Unable to update message' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  try {
    const { id } = await params;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.code === 'PGRST205') {
        await ensureTableExists('contact_messages');
        const retry = await supabase.from('contact_messages').delete().eq('id', id);
        if (retry.error) {
          console.error('Supabase error:', retry.error);
          return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
        }
        return NextResponse.json({ success: true });
      }

      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Unable to delete message' }, { status: 500 });
  }
}
