const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genres: [String],
  retung: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
