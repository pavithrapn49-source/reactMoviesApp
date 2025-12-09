import React from "react";
import "../styles/dropdown.css";

/**
 * value: '', 'movie', 'series', 'episode'
 */
export default function DropdownFilter({ value, onChange }) {
  return (
    <div className="dropdown">
      <label>Type</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
    </div>
  );
}
