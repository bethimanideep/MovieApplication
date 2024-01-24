require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("redis");

const moviesController=require('./controllers/movieController')
const app = express();

app.use(cors());
app.use(express.json());

//redis config
const client = createClient({
  password: process.env.REDISPASSWORD,
  socket: {
    host: process.env.REDISURL,
    port: 16357,
  },
}).on("error", (err) => console.log("redis error"));

// Middleware to attach the Redis client to the request object
app.use((req, res, next) => {
  req.client = client;
  next();
});

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
