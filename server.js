const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie-router");

const PORT = 3000;
const URL = "mongodb://localhost:27017/moviebox";

const app = express();

app.use(express.json());
app.use(movieRoutes);

mongoose
  .connect(URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.warn("DB connection error:", err));

app.listen(PORT, (error) => {
  error
    ? console.warn("Error:", error)
    : console.log(`Listening port: ${PORT}`);
});
