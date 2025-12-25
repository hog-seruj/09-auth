'use client';

import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
interface NotePreviewClientProps {
  id?: string;
}

function NotePreviewClient({ id }: NotePreviewClientProps) {
  const params = useParams<{ id: string }>();
  const noteId = id ?? params.id;

  const router = useRouter();

  const close = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <p className={css.tag}>{note.tag}</p>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
