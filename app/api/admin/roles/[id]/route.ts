import { NextResponse } from 'next/server';
import { getAdminSupabase, handleMissingTable, isAutoCreateError } from '@/lib/supabase-admin';

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
      .from('roles')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      const recovered = await handleMissingTable('roles', async () =>
        await supabase.from('roles').update(body).eq('id', id).select().single()
      );
      return NextResponse.json(recovered);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating role:', error);
    const status = isAutoCreateError(error) ? 503 : 500;
    return NextResponse.json({ error: error?.message ?? 'Failed to update role' }, { status });
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
      .from('roles')
      .delete()
      .eq('id', id);

    if (error) {
      await handleMissingTable('roles', async () =>
        await supabase.from('roles').delete().eq('id', id)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting role:', error);
    const status = isAutoCreateError(error) ? 503 : 500;
    return NextResponse.json({ error: error?.message ?? 'Failed to delete role' }, { status });
  }
}