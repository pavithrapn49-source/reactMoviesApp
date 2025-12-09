import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setCount(favs.length);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="logo"><Link to="/">Movie Search</Link></h1>
        <nav>
          <button className="btn" onClick={() => navigate("/")}>Search</button>
          <button
            className="btn"
            onClick={() => {
              const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
              if (!favs.length) return alert("No favorites yet");
              // For simplicity show titles in alert. Extend to a page if you want.
              alert("Favorites:\n" + favs.map(f => `${f.Title} (${f.Year})`).join("\n"));
            }}
          >
            Favorites ({count})
          </button>
        </nav>
      </div>
    </header>
  );
}
