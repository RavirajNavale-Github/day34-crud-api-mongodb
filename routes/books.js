const express = require("express");
const {
  handleCreateNewBook,
  handleGetAllBooks,
  handleGetBookById,
  handleUpdateBookById,
  handleDeleteBookById,
} = require("../controllers/bookController");

const router = express.Router();

router.route("/").post(handleCreateNewBook).get(handleGetAllBooks);

router
  .route("/:id")
  .get(handleGetBookById)
  .put(handleUpdateBookById)
  .delete(handleDeleteBookById);

module.exports = router;
