import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note and save it in your NoteHub collection.",
  other: {
    url: "https://notehub.vercel.app/notes/action/create",
  },
  alternates: {
    canonical: "/notes/action/create",
  },
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note and save it in your NoteHub collection.",
    url: "https://notehub.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
