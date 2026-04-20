"use client";

import Link from "next/link";
import type { NoteTag } from "@/types/note";
import css from "./SidebarNotes.module.css";

const TAGS: (NoteTag | "all")[] = [
  "all",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag === "all" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

