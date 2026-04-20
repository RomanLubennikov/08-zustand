import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const selectedFilter = slug[0] ?? "all";
  const filterLabel =
    selectedFilter === "all" ? "All notes" : `${selectedFilter} notes`;
  const title = `${filterLabel} | NoteHub`;
  const description = `Browse ${filterLabel.toLowerCase()} in NoteHub.`;
  const url = `https://notehub.vercel.app/notes/filter/${selectedFilter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
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
