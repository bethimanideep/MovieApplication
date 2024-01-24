require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const moviesController = require("./controllers/movieController");
const { client } = require("./redis");
const app = express();

app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
  res.send("Movie Application");
});

// Routes using the moviesController
app.get("/movies", moviesController.getMovies);
app.post("/movies", moviesController.createMovie);
app.put("/movies", moviesController.updateMovie);
app.delete("/movies", moviesController.deleteMovie);

app.listen("4500", async () => {
  try {
    await client.connect().then(() => console.log("Connected to Redis"));

    await mongoose
      .connect(process.env.MONGODBURL)
      .then(() => console.log("Connected to DB"));
  } catch (error) {
    console.log(error);
  }
});


