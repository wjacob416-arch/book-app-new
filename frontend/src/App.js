import React, { use } from "react";
import { useState, useEffect } from "react";


function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((response) => response.json())
      .then((books) => setBooks(books));
  }, []);
  function AddBooks() {
    
  }
  return (
    <div>
      <h1>All Books</h1>
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
function LoadBooks(){

}

export default App;