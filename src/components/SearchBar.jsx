import React from "react";
import "../styles/searchbar.css";

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search movies, e.g. inception"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
