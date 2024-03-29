const mongoose = require("mongoose");
require("dotenv").config();

const movies = mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    }
  },
  { versionKey: false }
);

const moviesmodel = mongoose.model("movies", movies);

module.exports = {
  moviesmodel,
};
