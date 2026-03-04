import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const navigate = useNavigate();
  
  function handleSubmit() {
  fetch("http://127.0.0.1:5000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, isbn, published_date: publishedDate })
  })
  .then(() => navigate("/"));
}
  return (
    <div>
      <h1>Add a Book</h1>
      <Link to="/">Back to Home</Link>
      <br /><br />
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <br />
      <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <br />
      <input placeholder="Published Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
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