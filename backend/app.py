from flask import Flask, jsonify

app = Flask(__name__)

books = [
    {"id": 1, "title": "1984", "author": "George Orwell", "genre": "fiction"},
    {"id": 2, "title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "fiction"}
]

@app.route("/")
def home():
    return "Hello, Book Tracker!"

@app.route("/books")
def get_books():
    return jsonify(books)
@app.route("/authors")
def get_authors():
    authors = []                # start with empty list
    for book in books:          # go through each book
        authors.append(book["author"])  # add the author to the list
    return jsonify(authors)

if __name__ == "__main__":
    app.run(debug=True)
