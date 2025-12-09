import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import MovieDetails from "./pages/MovieDetails";



export default function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
}
