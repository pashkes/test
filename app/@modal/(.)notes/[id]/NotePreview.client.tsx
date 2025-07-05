'use client';
import Modal from '@/components/Modal/Modal';

import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api/clientApi';

export default function NotePreviewClient() {
  const router = useRouter();
  const closeModal = () => router.back();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notePreview', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!data) return <p>Something went wrong.</p>;

  return (
    <Modal closeModal={closeModal}>
      <div className={css.container}>
        <header className={css.header}>
          <h2>{data.title}</h2>
        </header>
        <div className={css.date}>
          <time>{new Date(data.createdAt).toLocaleString()}</time>
        </div>
        <p className={css.content}>{data.content}</p>
        {data.category && <span className={css.tag}>{data.category.name}</span>}

        <button onClick={closeModal} className={css.backBtn}>
          Back
        </button>
      </div>
    </Modal>
  );
}
