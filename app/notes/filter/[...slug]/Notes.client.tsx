"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";

import { useDebounce } from "use-debounce";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes, NotesResponse } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Link from "next/link";

interface NotesProps {
  initialData: NotesResponse;
  tag?: string;
}

function Notes({ initialData, tag }: NotesProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isError, isPending } = useQuery({
    queryKey: ["noteList", tag, debouncedSearchQuery, currentPage],
    queryFn: () => fetchNotes(currentPage, debouncedSearchQuery, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateSearchQuery = (text: string) => {
    setCurrentPage(1);
    setSearchQuery(text);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchQuery={searchQuery} onChange={updateSearchQuery} />
        {data?.totalPages && (
          <Pagination
            onPageChange={onPageChange}
            totalPages={data.totalPages}
            currentPage={currentPage}
          />
        )}

        <Link href="/notes/action/create">Create note +</Link>
      </header>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <NoteForm />
        </Modal>
      )}
      {isPending && <Loader />}
      {data?.notes && <NoteList list={data.notes} />}
      {isError && <ErrorMessage />}
    </div>
  );
}

export default Notes;
