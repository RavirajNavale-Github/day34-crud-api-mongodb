const express = require("express");
const bodyParser = require("body-parser");

const { connectMongo } = require("./config/mongoConnect");
const booksRouter = require("./routes/books");

const app = express();
const PORT = 4000;

//connection
connectMongo("mongodb+srv://ravirajnavale9899:MongoAtlas@cluster0.toadcrk.mongodb.net/")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Unable to connect to MongoDB");
  });

//middleware
app.use(bodyParser.json());

//routes
app.use("/books", booksRouter);


//port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
