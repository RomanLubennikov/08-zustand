"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/notes";
import type { NoteTag } from "@/types/note";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  async function handleCreateNoteAction(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();
    const tag = String(formData.get("tag") ?? "Todo") as NoteTag;

    if (!title) {
      setSubmitError("Title is required");
      return;
    }

    setSubmitError(null);

    try {
      await mutation.mutateAsync({
        title,
        content,
        tag,
      });
    } catch {
      setSubmitError("Error creating note. Try again.");
    }
  }

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(event) => setDraft({ title: event.target.value })}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className={css.textarea}
          value={draft.content}
          onChange={(event) => setDraft({ content: event.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(event) =>
            setDraft({ tag: event.target.value as NoteTag })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          formAction={handleCreateNoteAction}
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Create note"}
        </button>
      </div>

      {submitError && <div className={css.error}>{submitError}</div>}
    </form>
  );
}
