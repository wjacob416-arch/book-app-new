import { useState, useEffect } from "react";
import './App.css';

function SearchBar({ setTitle, setAuthor, setIsbn, setPublishedDate }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function handleSearch() {
    
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5
`)
      .then((res) => res.json())
      .then((data) => setResults(data.docs || []))
      .catch((err) => console.error("Search failed:", err));
  }
   

  return (
    <div className="search-box">
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Find on Open Library..." 
      />
      <button className="submit-btn" onClick={handleSearch}>Search</button>
      <ul className="search-results">
        {results.map((book, i) => (
          <li key={i} onClick={() => {
            setTitle(book.title || "");
            setAuthor(book.author_name?.[0] || "");
            setIsbn(book.isbn?.[0] || "");
            setPublishedDate(book.first_publish_year?.toString() || "");
          }} style={{ cursor: "pointer", borderBottom: "1px solid #ddd", padding: "10px" }}>
            <strong>{book.title}</strong> (Click to Fill Form)
          </li>
        ))}
      </ul>
    </div>
  );
}

function ManualEntryForm({ onRefresh, title, setTitle, author, setAuthor, isbn, setIsbn, publishedDate, setPublishedDate }) {
  function handleSubmit() {
    if (!title || !author) return;
    fetch("http://127.0.0.1:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, isbn, published_date: publishedDate })
    }).then(() => {
      onRefresh();
      setTitle(""); setAuthor(""); setIsbn(""); setPublishedDate("");
    });
  }
  return (
    <div>
      <h2>Add Manually</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <input placeholder="Genre/Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
      <button className="addBook-Btn" onClick={handleSubmit}>Add Book</button>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const fetchbooks = () => {
    // I FIXED THE BACKEND URL: Added :5000/books
    fetch("http://127.0.0.1:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Flask is likely not running."));
  };
    function handleDelete(book_id) {
  fetch(`http://127.0.0.1:5000/books/${book_id}`, { method: "DELETE" })
    .then(() => fetchbooks()); // re-fetches from DB instead of filtering locally
}
  useEffect(() => { fetchbooks(); }, []);

  return (
    <div className="dashboard-grid">
      <div className="manual-entry-box">
        <ManualEntryForm 
          onRefresh={fetchbooks} 
          title={title} setTitle={setTitle} 
          author={author} setAuthor={setAuthor} 
          isbn={isbn} setIsbn={setIsbn} 
          publishedDate={publishedDate} setPublishedDate={setPublishedDate} 
        />
      </div>
      <div className="main-content">
        <div className="search-section">
          <SearchBar 
            setTitle={setTitle} 
            setAuthor={setAuthor} 
            setIsbn={setIsbn} 
            setPublishedDate={setPublishedDate} 
          />
        </div>
        <div className="collection-section">
          <h2>Your Collection</h2>
          <ul>
            {books.map((b) => (
              <li key={b.id}>
                <strong>{b.title}</strong> by {b.author}
                <button className="delete-btn" onClick={() => handleDelete(b.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
