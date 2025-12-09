import React from "react";
import SearchBar from "../components/SearchBar";
import DropdownFilter from "../components/DropdownFilter";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { searchMovies } from "../api/omdbApi";
import "../styles/globals.css";

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState(""); // '', 'movie', 'series', 'episode'
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState([]);
  const [totalResults, setTotalResults] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [favCount, setFavCount] = React.useState(JSON.parse(localStorage.getItem("favorites") || "[]").length);

  // Search/Fetch function
  const doSearch = React.useCallback(async (q, t, p) => {
    if (!q) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies({ query: q, type: t, page: p });
      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No results found");
      } else {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults || 0));
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);
React.useEffect(() => {
  if (!query) return;
  doSearch(query, type, page);
}, [query, page, type]);


  function submit(e) {
    e.preventDefault();
    setPage(1);
    doSearch(query, type, 1);
  }

  function handleFavCount(newCount) {
    setFavCount(newCount);
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="page">
      <div className="controls" style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <SearchBar value={query} onChange={setQuery} onSubmit={submit} />
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <DropdownFilter value={type} onChange={setType} />
          <div style={{ fontSize: 14 }}>Favorites: {favCount}</div>
        </div>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "#b91c1c" }}>{error}</div>}
      {!loading && !error && movies.length === 0 && query && <div>No results for "{query}"</div>}

      <div className="grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
        gap: 16
      }}>
        {movies.map(m => (
          <MovieCard key={m.imdbID} movie={m} onFavChange={handleFavCount} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={(p) => {
        if (p < 1 || p > totalPages) return;
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} />
    </div>
  );
}
