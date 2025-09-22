# Book Tracker App - Progress Notes
## Sunday 9/21/25
## Backend (Flask)
- Created `app.py` with Flask app.
- Routes so far:
  - `/` → "Hello, Book Tracker!"
  - `/books` (GET) → returns list of books
  - `/authors` (GET) → returns list of authors
  - `/books` (POST) → add a new book
  - `/books/<id>` (DELETE) → delete a book by id

## Next Steps
- Add **update route** (`PUT /books/<id>`) to modify book info.
- Later: connect backend to a database (SQLite).
- After backend basics: connect frontend (React) to display books.

## Reminder
- Use forward slash `/` not backslash `\` in route paths.
- `books.remove(book)` removes the book dictionary from the list.
- Can test routes with curl in PowerShell, but okay to skip for now.

