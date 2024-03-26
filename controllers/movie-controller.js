const Movie = require("../models/movie");

const handleError = (res, error, status = 500) => {
  console.warn(error);
  res.status(status).json({ error });
};

const getMovies = (req, res) => {
  Movie.find()
    .sort({ year: 1 })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((err) => handleError(res, err));
};

const getMovie = (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (movie) {
        res.status(200).json(movie);
      } else {
        handleError(res, "Wrong id");
      }
    })
    .catch((err) => handleError(res, err));
};
const deleteMovie = (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        handleError(res, "Wrong id");
      }
    })
    .catch((err) => handleError(res, err));
};
const addMovie = (req, res) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => handleError(res, err));
};
const updateMovie = (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => handleError(res, err));
};

module.exports = { getMovies, getMovie, deleteMovie, addMovie, updateMovie };
