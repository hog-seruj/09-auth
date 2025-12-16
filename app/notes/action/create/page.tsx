import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Here you can create new note',
  openGraph: {
    title: 'Create Note',
    description: 'Here you can create new note',
    url: `08-zustand-five-beryl.vercel.app/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        alt: 'Create Note',
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
