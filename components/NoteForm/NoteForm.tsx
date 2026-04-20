"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api/notes";
import type { CreateNoteInput, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  content: Yup.string()
    .max(500, "Content cannot exceed 500 characters")
    .optional(),

  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});
export default function NoteForm({ onCancel, onSuccess }: NoteFormProps) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateNoteInput) => createNote(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      if (onSuccess) onSuccess();
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(
          {
            ...values,
            tag: values.tag as NoteTag,
          },
          { onSuccess: () => resetForm() }
        );
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label>Title</label>
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label>Content</label>
            <Field
              as="textarea"
              name="content"
              rows={6}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label>Tag</label>
            <Field as="select" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Create note"}
            </button>
          </div>

          {mutation.isError && (
            <div className={css.error}>Error creating note. Try again.</div>
          )}
        </Form>
      )}
    </Formik>
  );
}
