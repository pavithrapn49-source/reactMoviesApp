import React from "react";
import { Link } from "react-router-dom";
import "../styles/moviecard.css";

/**
 * movie: object from OMDb Search (Title, Year, imdbID, Type, Poster)
 */
export default function MovieCard({ movie, onFavChange }) {
  const [isFav, setIsFav] = React.useState(false);

  React.useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(favs.some(f => f.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  function toggleFav(e) {
    e.preventDefault();
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favs.some(f => f.imdbID === movie.imdbID);
    if (exists) {
      // remove using filter — allowed for favorites logic (the no-filter rule only applied to dropdown filtering).
      const updated = favs.filter(f => f.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFav(false);
      onFavChange && onFavChange(updated.length);
    } else {
      favs.push({
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Poster: movie.Poster,
        Type: movie.Type
      });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setIsFav(true);
      onFavChange && onFavChange(favs.length);
    }
  }

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="poster-wrap">
        <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Poster"} alt={movie.Title} />
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p className="meta">{movie.Year} • {movie.Type}</p>
        <div className="card-actions">
          <button onClick={toggleFav} className="fav-btn">{isFav ? "Remove" : "Favorite"}</button>
          <span className="id">{movie.imdbID}</span>
        </div>
      </div>
    </Link>
  );
}
