"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={3}
      pageCount={Math.max(pageCount, 1)}
      forcePage={currentPage - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
