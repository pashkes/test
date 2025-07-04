// app/api/notes/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const { data } = await api(`/notes/${id}`);

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json(
	  { error: 'Failed to fetch note' }, 
	  { status: 500 }
	);
}
