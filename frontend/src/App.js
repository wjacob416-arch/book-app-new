import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

function HomePage(){
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((response) => response.json())
      .then((books) => setBooks(books));
  }, []);
   return (
    <div>
      <h1>All Books</h1>
      <Link to="/add">Add a Book</Link>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
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
