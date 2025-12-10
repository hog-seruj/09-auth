import axios from 'axios';
import type { Note, CreateNoteData } from '@/types/note';
const NOTEToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const noteInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${NOTEToken}`,
  },
});

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await noteInstance.get<FetchNotesResponse>('/notes', {
    params: {
      search: searchText,
      page,
      tag,
      perPage: 12,
    },
  });
  return response.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const response = await noteInstance.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const response = await noteInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};
