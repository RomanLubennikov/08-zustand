import type { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The requested page does not exist in the NoteHub application.",
  other: {
    url: "https://notehub.vercel.app/not-found",
  },
  alternates: {
    canonical: "/not-found",
  },
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "The requested page does not exist in the NoteHub application.",
    url: "https://notehub.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

