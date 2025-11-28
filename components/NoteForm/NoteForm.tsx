import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';
import { createNote } from '@/lib/api/noteService';
import type { CreateNoteData, Note } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import css from './NoteForm.module.css';

const INITIAL_VALUES: CreateNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Title is required'),
  content: Yup.string().max(500, 'Maximum 500 symbols'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

interface NoteFormProps {
  closeModal: () => void;
}

export default function NoteForm({ closeModal }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const mutation = useMutation<Note, Error, CreateNoteData>({
    mutationFn: (note) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note edited successfully!');
      closeModal();
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const handleSubmit = (values: CreateNoteData) => {
    mutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            id={`${fieldId}-tag`}
            as="select"
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
