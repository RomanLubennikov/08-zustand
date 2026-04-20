"use client";

import { useEffect } from "react";

export default function NoteError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <p>Could not fetch note details. {error.message}</p>;
}
