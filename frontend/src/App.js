import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);   // books starts as an empty list
  useEffect(() => {
    fetch("http://127.0.0.1:5000/books")
      .then((response) => response.json())  // convert response to JSON
      .then((data) => {
        setBooks(data);                     // put JSON into books state
      });
  }, []); // [] means run only once, when page loads
  return (
    <div>
      <h1>Book Tracker App</h1>
      <ul>
        {/* 3. loop through books and show each title */}
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;