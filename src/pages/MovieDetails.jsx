import React from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/omdbApi";
import "../styles/details.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    getMovieById(id)
      .then(data => {
        if (data.Response === "False") {
          setError(data.Error || "Movie not found");
        } else {
          setMovie(data);
        }
      })
      .catch(err => setError(err.message || "An error occurred"))
      .finally(() => setLoading(false));
  }, [id]);

  function toggleFav() {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favs.some(f => f.imdbID === movie.imdbID);
    if (exists) {
      const updated = favs.filter(f => f.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert("Removed from favorites");
    } else {
      favs.push({
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Poster: movie.Poster,
        Type: movie.Type
      });
      localStorage.setItem("favorites", JSON.stringify(favs));
      alert("Added to favorites");
    }
  }

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{ color: "#b91c1c" }}>{error}</div>;
  if (!movie) return null;

  return (
    <div className="details">
      <div className="details-left">
        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Poster"} alt={movie.Title} />
      </div>
      <div className="details-right">
        <h1>{movie.Title} <span className="muted">({movie.Year})</span></h1>
        <p className="muted">{movie.Genre} • {movie.Runtime} • {movie.Rated}</p>
        <p style={{ marginTop: 12 }}>{movie.Plot}</p>

        <div style={{ marginTop: 12 }}>
          <strong>Cast:</strong>
          <p>{movie.Actors}</p>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Ratings:</strong>
          <ul>
            {movie.Ratings && movie.Ratings.map(r => (
              <li key={r.Source}>{r.Source}: {r.Value}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={toggleFav} className="fav-toggle">Toggle Favorite</button>
        </div>
      </div>
    </div>
  );
}
