import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function LayoutNotes({ children, sidebar }: LayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}

