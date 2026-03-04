# 📚 Book Tracker App

A full-stack web application for managing a personal book collection. Search real books using the Open Library API and add them to your collection with a single click.

---

## Tech Stack

**Frontend:** React, CSS  
**Backend:** Python, Flask  
**Database:** SQLite  
**External API:** [Open Library Search API](https://openlibrary.org/dev/docs/api)

---

## Features

- Search books by title using the Open Library API
- Click any search result to auto-fill the form
- Manually add books by title, author, ISBN, and genre/date
- View your full collection
- Delete books from your collection

---

## Project Structure
```
book-app/
├── backend/
│   └── app.py          # Flask REST API
├── frontend/
│   └── src/
│       ├── App.jsx     # Main React component
│       └── App.css     # Styles
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.x
- Node.js & npm

### Backend Setup
```bash
cd backend
pip install flask flask-cors
python app.py
```
Flask runs on `http://127.0.0.1:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
React runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Retrieve all books |
| POST | `/books` | Add a new book |
| DELETE | `/books/<id>` | Delete a book by ID |

### Example POST body
```json
{
  "title": "Moby Dick",
  "author": "Herman Melville",
  "isbn": "9780142437247",
  "published_date": "1851"
}
```
## Database Schema
```sql
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    published_date DATE,
    isbn TEXT UNIQUE
);
```
---

## Notes

- Duplicate ISBNs are handled gracefully and won't crash the server
- CORS is enabled so React can communicate with Flask
- The SQLite database (`books.db`) is created automatically on first run

---

## Author

Jacob Williams — [GitHub](https://github.com/wjacob416-arch)