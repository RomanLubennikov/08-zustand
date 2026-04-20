"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root") || document.body
      : null;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!modalRoot) return null;

  function backdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return createPortal(
    <div
      className={css.backdrop}
      onClick={backdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
