const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    createdAt: { type: Date, default: Date.now },
  });

  const Book = mongoose.model("books", bookSchema);

  module.exports = Book;