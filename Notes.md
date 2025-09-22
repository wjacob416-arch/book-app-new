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

Monday 9/22
## Backend (Flask)
- Built `app.py` with Flask routes:
  - `/` → "Hello, Book Tracker!"
  - `/books` (GET) → returns all books
  - `/authors` (GET) → returns list of authors
  - `/books` (POST) → add a new book
  - `/books/<id>` (DELETE) → delete a book by id
  - `/books/<id>` (PUT) → update a book by id
- Added **CORS(app)** to allow frontend (React) to call backend.

## Frontend (React)
- Cleaned starter code → only shows `Book Tracker App`.
- Added fetch to `/books` on page load:
  - Uses `useEffect` to call backend.
  - Stores result in `books` state with `useState`.
  - Displays list: `"Title by Author"`.

  ## Next Steps
- Add a form in React to **POST new books** to the backend.
- Add delete buttons in React to call **DELETE /books/<id>**.
- Add update feature in React to call **PUT /books/<id>**.

