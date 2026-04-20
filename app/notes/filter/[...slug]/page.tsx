import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterNotesPage({ params }: FilterPageProps) {
  const { slug } = await params;

  const tagFromParams = slug[0] ?? "all";
  const normalizedTag =
    tagFromParams !== "all" ? (tagFromParams as NoteTag) : undefined;

  const qc = new QueryClient();

  const defaultParams = {
    page: 1,
    perPage: 12,
    search: "",
    tag: normalizedTag,
  };

  await qc.prefetchQuery({
    queryKey: ["notes", defaultParams],
    queryFn: () => fetchNotes(defaultParams),
  });

  const dehydratedState = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialTag={normalizedTag} />
    </HydrationBoundary>
  );
}
