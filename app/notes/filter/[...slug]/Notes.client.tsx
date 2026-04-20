"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
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

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useQuery({
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
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

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
