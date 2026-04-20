"use client";

import { useEffect } from "react";

export default function NotesError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <p>Could not fetch the list of notes. {error.message}</p>;
}
