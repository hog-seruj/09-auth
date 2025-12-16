import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CreateNoteData } from '@/types/note';

type NoteDraftStore = {
  draft: CreateNoteData;
  setDraft: (note: CreateNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
