'use client';
import css from './NotesPage.module.css';

import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import useModalControl from '@/components/hooks/useModalControl';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { fetchNotes } from '@/lib/api';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTextDebounce] = useDebounce(searchText, 500);
  const { isModalOpen, openModal, closeModal } = useModalControl();

  console.log(tag);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', searchTextDebounce, currentPage, tag],
    queryFn: () => fetchNotes(searchTextDebounce, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes && data.notes.length < 1) {
      toast.error('No notes found for your request.');
    }
  }, [data]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleCreateTaskButton = () => {
    setCurrentPage(1);
    openModal();
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={searchText} onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleCreateTaskButton}>
          Create note +
        </button>
      </header>
      <Toaster />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm closeModal={closeModal} resetSearchBox={handleSearch} />
        </Modal>
      )}
    </div>
  );
}
