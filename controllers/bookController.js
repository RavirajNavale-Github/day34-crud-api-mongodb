const Book = require("../models/bookModel");

const handleCreateNewBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const book = new Book({ title, author, publishedYear });
    await book.save();
    return res
      .status(201)
      .send({ success: true, message: "Book added in Database Successfully." });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

const handleGetAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    if (books<1) {
      return res
        .status(404)
        .send({ success: false, message: "No books found in Database." });
    } else {
      return res.status(200).send({
        success: true,
        message: "Extracted All Books from Database Successfully.",
        data: books,
      });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

const handleGetBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .send({
          success: false,
          message: `Book with ${id} not found in database.`,
        });
    } else {
      return res.status(200).send({ success: true, message: book });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

const handleUpdateBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, publishedYear } = req.body;
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, publishedYear },
      { new: true }
    );

    if (!book) {
      return res
        .status(404)
        .send({ success: false, message: "Book Not Found in Database." });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Book Update Successfully." });
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

const handleDeleteBookById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    let result = await Book.findByIdAndDelete(id);

    if(!result){
      return res.status(404).send({success: false, message: `Book with id ${id} not found in database.`})
    } else{
      return res.status(200).send({success:true, message: `Book with id ${id} deleted from database successfully.`})
    }
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
};

module.exports = {
  handleCreateNewBook,
  handleGetAllBooks,
  handleGetBookById,
  handleUpdateBookById,
  handleDeleteBookById,
};
