import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/notes";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydrated = dehydrate(qc);

  return (
    <HydrationBoundary state={dehydrated}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
