// app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const formData = await request.formData();

  const { data } = await api.post('/upload', formData, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
}
