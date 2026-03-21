from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
# Allow your React app to talk to this backend
CORS(app)

def get_db():
    conn = sqlite3.connect('books.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            published_date DATE,
            isbn TEXT UNIQUE
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/books", methods=["GET"])
def get_books():
    conn = get_db()
    books = conn.execute("SELECT * FROM books").fetchall()
    conn.close()
    return jsonify([dict(book) for book in books])

@app.route("/books", methods=["POST"])
def add_books():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data"}), 400
    
    conn = get_db()
    try:
        # "OR IGNORE" prevents the crash if the ISBN is a duplicate
        conn.execute(
            "INSERT INTO books (title, author, published_date, isbn) VALUES (?, ?, ?, ?)",
            (data.get("title"), data.get("author"), data.get("published_date"), data.get("isbn") or None)
        )
        conn.commit()
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()
    return jsonify({"status": "success"}), 201
@app.route("/books/<int:id>", methods=["DELETE"])
def delete_book(id):
    conn = get_db()
    book = conn.execute("SELECT * FROM books WHERE id = ?", (id,)).fetchone()
    if not book:
        conn.close()
        return jsonify({"error": "Book not found"}), 404
    conn.execute("DELETE FROM books WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"status": "deleted"}), 200
# Add your other routes (DELETE/PUT) below here as needed
if __name__ == "__main__":
    app.run(debug=True, port=5000)