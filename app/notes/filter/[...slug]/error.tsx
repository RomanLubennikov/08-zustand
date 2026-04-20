"use client";

import { useEffect } from "react";

export default function FilterNotesError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <p>Could not fetch filtered notes. {error.message}</p>;
}
