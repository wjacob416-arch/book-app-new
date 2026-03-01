import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
