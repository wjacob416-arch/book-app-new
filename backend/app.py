from flask import Flask, request,jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

sqlite_connection = sqlite3.connect('books.db', check_same_thread=False)
cursor = sqlite_connection.cursor()

def get_db():
    conn = sqlite3.connect('books.db')
    conn.rows_factory = sqlite3.rows # lets us return results as dictionaries
    return conn

def init_db():
    conn = get_db()
    with open('schema.sql', 'r') as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

@app.route("/")
def home():
    return "Hello, Book Tracker!"

@app.route("/books", methods=["GET"])
def get_books():
    conn = get_db()
    books = conn.execute("Select * FROM books").fetchall()
    conn.close()
    return jsonify([dict(book) for book in books])

@app.route("/books",methods=["POST"])
def add_books():
    data = request.get_json()
    conn = get_db()
    conn.execute(
        "INSERT INTO books (title, author, published_date, isbn) VALUES (?, ?, ?, ?)",
        (data["title"], data["author"], data.get("published_date"), data.get("isbn"))
    )
    conn.commit()
    conn.close()
    return jsonify(data), 201

@app.route("/authors", methods=["GET"])
def get_authors():
    conn = get_db()
    authors = conn.execute("SELECT DISTINCT author FROM books").fetchall()
    conn.close()
    return jsonify([row["authors"] for row in authors])

@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    conn = get_db()
    book = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    if book is None:
        conn.close()
        return jsonify({"error": "Book not found"}), 404
    conn.execute("DELETE FROM books WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
    return jsonify(dict(book)), 200

@app.route("/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    data = request.get_json()
    conn = get_db()
    book = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    if book is None:
        conn.close()
        return jsonify({"error": "Book not found"}), 404
    conn.execute("UPDATE books SET title = ? WHERE id = ?", (data["title"], book_id))
    conn.commit()
    conn.close()
    return jsonify({"id": book_id, "title": data["title"]}), 200

if __name__ == "__main__":
    init_db()
    app.run(debug=True)


    