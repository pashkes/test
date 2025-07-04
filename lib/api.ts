import axios, { type AxiosResponse } from "axios";
import type { CreateNoteType, Note } from "../types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const nextServer = axios.create({
  baseURL: 'https://9000-firebase-08-zustandgit-1751392557951.cluster-c23mj7ubf5fxwq6nrbev4ugaxa.cloudworkstations.dev/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
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

  if (tag && tag.toLowerCase() !== "all") {
    params.tag = tag;
  }

  const response: AxiosResponse<NotesResponse> = await nextServer.get("/notes");

  return response.data;
};

export const createNote = async (payload: CreateNoteType): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", payload);

  return response.data;
};

export const deleteNoteById = async (id: number): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const getSingleNote = async (id: number): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};
