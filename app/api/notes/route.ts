// app/api/notes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get('categoryId');

  const { data,  } = await api('/notes', {
    params: { categoryId },
  });
  
  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json(
	  { error: 'Failed to fetch notes' }, 
		{ status: 500 }
	);
}



export async function POST(request: NextRequest) {
	// Отримуємо дані з тіла запиту
  const body = await request.json();

	// Передаємо їх далі на бекенд нотаток
  const { data } = await api.post('/notes', body);

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
}