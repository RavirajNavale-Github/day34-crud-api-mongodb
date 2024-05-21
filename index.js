const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

mongoose.connect("mongodb://0.0.0.0:27017/library");
mongoose.connection.on("open", () => {
  console.log("MongoDB connection successful");
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
  //   console.error("MongoDB connection error:")
);

app.use(bodyParser.json());

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("books", bookSchema);

//Add book in DB
app.post("/books", async (req, res) => {
  const { title, author, publishedYear } = req.body;
  const book = new Book({ title, author, publishedYear });
  const result = await book.save();

  res.status(201).send("Book added in Database Successfully.");
});

//Get all books
app.get("/books", async (req, res) => {
  const books = await Book.find();

  res.status(200).json(books);
});

//Get book by ID
app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  const books = await Book.findById(id);

  res.status(200).json(books);
});

//update book by ID
app.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, publishedYear } = req.body;
  const book = await Book.findByIdAndUpdate(
    id,
    { title, author, publishedYear },
    { new: true }
  );
  res.json(book);
});

//Delete book with ID
app.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  // let result = await Book.deleteOne({id});
  let result = await Book.findByIdAndDelete(id);

  res.status(200).send(`Book with Id ${id} deleted successfully.`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
