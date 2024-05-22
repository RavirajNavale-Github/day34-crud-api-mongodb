const mongoose = require("mongoose");

const connectMongo = async (url) => {
    return mongoose.connect(url);
}

// mongoose.connect("mongodb://0.0.0.0:27017/library");
// mongoose.connection.on("open", () => {
//   console.log("MongoDB connection successful");
// });
// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection error:")
//   //   console.error("MongoDB connection error:")
// );

module.exports = { connectMongo };