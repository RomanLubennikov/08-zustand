import type { CreateNoteInput, Note, NoteTag } from "@/types/note";
import { api } from "./client";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  total: number;
}

export async function fetchNotes(params: FetchNotesParams) {
  const { tag, ...rest } = params;

  const queryParams = tag ? { ...rest, tag } : rest;

  const res = await api.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: CreateNoteInput) {
  const res = await api.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}
