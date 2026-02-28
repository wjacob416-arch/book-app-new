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
    