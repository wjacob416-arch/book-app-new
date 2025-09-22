from flask import Flask, request,jsonify

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
@app.route("/books", methods=["POST"])
def add_book():
    new_book = request.get_json()  # get JSON data from request
    books.append(new_book) # add it to the list
    return jsonify(new_book), 201  # return what was added
@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id): # designed to go and delete a book in the list
    for book in books:  # go through each book in books
        if book["id"] == book_id:
           books.remove(book)
           return jsonify(book), 200
    return jsonify({"error": "Book not found"}), 404
        

if __name__ == "__main__":
    app.run(debug=True)
