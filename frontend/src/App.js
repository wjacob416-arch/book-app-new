import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

function AddBookPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  function handleSearch() {
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`)
      .then((response) => response.json())
      .then((data) => setResults(data.docs || []));
  }

  function handleSelect(book) {
    const bookData = {
      title: book.title || "Unknown Title",
      author: book.author_name?.[0] || "Unknown Author",
      isbn: book.isbn?.[0] || "",
      published_date: book.first_publish_year?.toString() || ""
    };

    fetch("http://127.0.0.1:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData)
    })
    .then((res) => {
      if (res.ok) navigate("/");
      else alert("This book might already be in your list.");
    })
    .catch((err) => console.error("Connection error:", err));
  }

  return (
    <div className="container">
      <h1>Add a Book</h1>
      <Link to="/">Back to Home</Link>
      <br /><br />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <button className="submit-btn" onClick={handleSearch}>Search</button>
      <ul>
        {results.map((book, i) => (
          <li key={i} onClick={() => handleSelect(book)} style={{ cursor: "pointer" }}>
            {book.title} by {book.author_name?.[0]}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://127.0.0.1:5000/books/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) setBooks(books.filter((b) => b.id !== id));
      });
  }

  return (
    <div className="container">
      <h1>All Books</h1>
      <Link to="/add">Add a Book</Link>
      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <span>{b.title} by {b.author}</span>
            <button className="delete-btn" onClick={() => handleDelete(b.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
