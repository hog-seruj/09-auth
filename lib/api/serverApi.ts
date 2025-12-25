import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { FetchNotesResponse } from './clientApi';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotesServer = async (
  searchText: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: searchText,
      page,
      tag,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const responseById = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return responseById.data;
}
