import { NextResponse } from 'next/server';
import { ensurePressReleasesTable, getAdminSupabase } from '@/lib/supabase-admin';

const supabase = getAdminSupabase();

async function handleMissingTable(error: any, action: () => Promise<{ data: any; error: any }>) {
  if (error?.code !== 'PGRST205') {
    throw error;
  }

  await ensurePressReleasesTable();
  const result = await action();
  if (result.error) {
    throw result.error;
  }

  return result.data;
}

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
      .from('press_releases')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      const recovered = await handleMissingTable(error, async () =>
        await supabase.from('press_releases').update(body).eq('id', id).select().single()
      );
      return NextResponse.json(recovered);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating press release:', error);
    return NextResponse.json({ error: 'Failed to update press release' }, { status: 500 });
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
      .from('press_releases')
      .delete()
      .eq('id', id);

    if (error) {
      await handleMissingTable(error, async () =>
        await supabase.from('press_releases').delete().eq('id', id)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting press release:', error);
    return NextResponse.json({ error: 'Failed to delete press release' }, { status: 500 });
  }
}
