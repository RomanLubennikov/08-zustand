import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface InterceptedNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const { id } = await params;
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
