import { Note, CreateNoteData } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: searchText,
      page,
      tag,
      perPage: 12,
    },
  });
  return response.data;
};

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);

  return response.data;
}

export async function createNote(noteContent: CreateNoteData) {
  const response = await nextServer.post<Note>('/notes', noteContent);
  return response.data;
}

export async function deleteNote(noteID: string) {
  const deletedNote = await nextServer.delete<Note>(`/notes/${noteID}`, {
    headers: {
      accept: 'application/json',
    },
  });
  return deletedNote.data;
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  username: string;
  email: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
};
