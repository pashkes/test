import { nextServer } from './api';
import { AxiosResponse } from 'axios';

import type { CreateNoteType, Note } from '../../types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  tag?: string
): Promise<NotesResponse> => {
  const perPage = 12;

  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search;
  }

  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const response: AxiosResponse<NotesResponse> = await nextServer.get('/notes');

  return response.data;
};

export const createNote = async (payload: CreateNoteType): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', payload);

  return response.data;
};

export const deleteNoteById = async (id: number): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await nextServer.get<Category[]>('/categories');
  return response.data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

// lib/api.ts

// попередній код

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};
