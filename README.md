 🎬 Movie Search App

A React-based movie search application that integrates with the OMDb API to allow users to search movies, view detailed information, filter results, and manage favorites.

🚀 Built with: React, React Router, CSS, JavaScript, Vite.

📌 Features
🔍 1. Movie Search

Search movies by title or keyword

Real-time API requests to OMDb

🎛 2. Filter by Type

Movies

Series

Episodes

Uses OMDb filtering (no .filter() method used)

📄 3. Movie Details Page

Larger poster

Full plot

Year, genre, ratings

Cast & crew information

⭐ 4. Favorites Management

Add/remove favorites

Stored in localStorage

Favorites count visible on UI

📄 5. Pagination

API-based pagination

Next / previous page navigation

🧭 6. React Router Navigation

/ → Search Page

/movie/:id → Movie Details Page

❗ 7. Error Handling

Handles:

Invalid API key

Empty search

No results

Network issues

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/pavithrapn49-source



📁 Project Structure
reactMoviesApp/
│── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── DropdownFilter.jsx
│   ├── pages/
│   │   ├── SearchPage.jsx
│   │   ├── MovieDetails.jsx
│   ├── api/
│   │   └── omdbApi.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── moviecard.css
│   │   ├── searchbar.css
│   │   ├── pagination.css
│   │   ├── details.css
│   ├── App.jsx
│   ├── main.jsx
│── .env
│── index.html
│── README.md
│── package.json