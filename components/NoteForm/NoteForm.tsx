'use client';

import { createNote } from '@/lib/api/clientApi';
import type { CreateNoteData } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      clearDraft();
      toast.success('Note added successfully');
      router.push('/notes/filter/all');
    },
    onError: (error) => {
      console.log('Error', error);
      toast.error('An error occurred');
    },
  });

  const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;
  type Tag = (typeof TAGS)[number];

  function isTag(value: string): value is Tag {
    return TAGS.includes(value as Tag);
  }

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');
    const tag = formData.get('tag');

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      typeof tag !== 'string'
    ) {
      toast.error('Invalid form data');
      return;
    }

    if (!isTag(tag)) {
      toast.error('Invalid tag value');
      return;
    }

    const values: CreateNoteData = {
      title,
      content,
      tag,
    };

    mutation.mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
