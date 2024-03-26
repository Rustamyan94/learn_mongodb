const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const PORT = 3000;

const app = express();
app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (error) => {
      error
        ? console.warn("Error:", error)
        : console.log(`Listening port: ${PORT}`);
    });
    db = getDb();
  } else {
    console.warn("DB connection error:", err);
  }
});

const handleError = (res, error, status = 500) => {
  console.warn(error);
  res.status(status).json({ error });
};

app.get("/movies", (req, res) => {
  const movies = [];
  db.collection("movies")
    .find()
    .sort({ year: 1 })
    .forEach((movie) => {
      movies.push(movie);
    })
    .then(() => {
      res.status(200).json(movies);
    })
    .catch((err) => handleError(res, "Someting goes wrong..."));
});
app.get("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          handleError(res, "Wrong id");
        }
      })
      .catch((err) => handleError(res, "Someting goes wrong..."));
  } else {
    handleError(res, "Wrong id");
  }
});
app.delete("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        if (result?.deletedCount) {
          res.status(200).json(result);
        } else {
          handleError(res, "Wrong id");
        }
      })
      .catch((err) => handleError(res, "Someting goes wrong..."));
  } else {
    handleError(res, "Wrong id");
  }
});
app.post("/movies", (req, res) => {
  db.collection("movies")
    .insertOne(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => handleError(res, "Someting goes wrong..."));
});
app.patch("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => handleError(res, "Someting goes wrong..."));
  } else {
    handleError(res, "Wrong id");
  }
});
