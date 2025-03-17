const express = require('express');
let books = require("./booksdb.js");
const axios = require("axios");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    return users.some(user => user.username === username);
};


// Simulating an API endpoint with a Promise
const fetchBooks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(books);
        }, 500); // Simulate delay
    });
};

// Task 10: Get the book list using async/await (Instead of synchronous response)
public_users.get("/", async (req, res) => {
    try {
        const bookList = await fetchBooks();
        res.status(200).json(bookList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Task 11: Get book details based on ISBN using Axios & Async/Await
public_users.get("/isbn/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const bookList = await fetchBooks();
        if (bookList[isbn]) {
            res.status(200).json(bookList[isbn]);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details" });
    }
});

// Task 12: Get book details based on Author using Promises
public_users.get("/author/:author", (req, res) => {
    const author = req.params.author;
    fetchBooks()
        .then((bookList) => {
            const filteredBooks = Object.values(bookList).filter(book => book.author === author);
            if (filteredBooks.length > 0) {
                res.status(200).json(filteredBooks);
            } else {
                res.status(404).json({ message: "No books found by this author" });
            }
        })
        .catch(() => res.status(500).json({ message: "Error fetching books by author" }));
});

// Task 13: Get book details based on Title using Axios & Async/Await
public_users.get("/title/:title", async (req, res) => {
    const title = req.params.title;
    try {
        const bookList = await axios.get("http://localhost:5000/");
        const filteredBooks = Object.values(bookList.data).filter(book => book.title === title);
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by title" });
    }
});


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
    //   return res.status(300).json({message: "Yet to be implemented"});
});

/*
// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books, null, 4));
    // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        return res.json(book);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const filteredBooks = Object.values(books).filter(book => book.author === author);

    if (filteredBooks.length > 0) {
        return res.json(filteredBooks);
    } else {
        return res.status(404).json({ message: "No books found by this author" });
    }
});

// Get book details based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const filteredBooks = Object.values(books).filter(book => book.title === title);

    if (filteredBooks.length > 0) {
        return res.json(filteredBooks);
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});
*/
// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        return res.json(book.reviews);
    } else {
        return res.status(404).json({ message: "No reviews found for this book" });
    }
});


module.exports.general = public_users;
