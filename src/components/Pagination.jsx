import React from "react";
import "../styles/pagination.css";

/**
 * page: current page number
 * totalPages: total pages
 * onChange: function(newPage)
 */
export default function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1}>Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={() => onChange(page + 1)} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
