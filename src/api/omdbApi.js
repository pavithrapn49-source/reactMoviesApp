const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE = "https://www.omdbapi.com/";

async function fetchFromOmdb(params) {
  const url = new URL(BASE);
  params.apikey = API_KEY;
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.append(k, v);
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  const data = await res.json();
  return data;
}

/**
 * Search movies using OMDb `s` param.
 * - query: string
 * - type: '', 'movie', 'series', 'episode' -> used as API param (no array.filter())
 * - page: number
 */
export async function searchMovies({ query, type = "", page = 1 }) {
  if (!query) return { Response: "False", Error: "No query provided" };
  const params = { s: query, page: String(page) };
  if (type) params.type = type; // server-side filtering
  return await fetchFromOmdb(params);
}

export async function getMovieById(id) {
  return await fetchFromOmdb({ i: id, plot: "full" });
}


