"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNotes } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import css from "../../NotesPage.module.css";

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

interface NotesClientProps {
  initialTag?: NoteTag;
}

export default function NotesClient({ initialTag }: NotesClientProps = {}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notes", { search: debouncedSearch, page, tag: initialTag }],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page,
        perPage: 12,
        tag: initialTag,
      }),
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Something went wrong</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />

        <button className={css.addButton} onClick={() => setIsOpen(true)}>
          Add note
        </button>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onCancel={() => setIsOpen(false)}
            onSuccess={() => {
              setIsOpen(false);
              refetch();
            }}
          />
        </Modal>
      )}

      <NoteList notes={data.notes} />

      {data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          pageCount={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
