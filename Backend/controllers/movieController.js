const { moviesmodel } = require("../db");

// Get movies from either Redis or DB
exports.getMovies = async (req, res) => {
  try {
    const redisData = JSON.parse(await req.client.get("movies"));
    if (redisData) {
      return res.status(200).json({ data: redisData, source: "from redis" });
    }

    const data = await moviesmodel.find();
    await req.client.set("movies", JSON.stringify(data));

    res.status(200).json({ data, source: "from db" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new movie
exports.createMovie = async (req, res) => {
  try {
    const { movieName, rating, genre, releaseYear, director, imageUrl } = req.body;

    const newMovie = new moviesmodel({
      movieName,
      imageUrl,
      rating,
      genre,
      releaseYear,
      director,
    });

    await newMovie.save();

    const data = await moviesmodel.find();
    await req.client.set("movies", JSON.stringify(data));

    res.status(201).json({ data, source: "from db" });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a movie by _id
exports.updateMovie = async (req, res) => {
  try {
    const { _id, updatedData } = req.body;

    if (!_id && !updatedData) {
      return res.status(400).json({ error: "Missing values in the request body" });
    }

    const updatedMovie = await moviesmodel.findByIdAndUpdate(_id, updatedData);

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const data = await moviesmodel.find();
    await req.client.set("movies", JSON.stringify(data));

    res.status(201).json({ data, source: "from db" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a movie by _id
exports.deleteMovie = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ error: "Missing _id in the request body" });
    }

    const deletedMovie = await moviesmodel.findByIdAndDelete(_id);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const data = await moviesmodel.find();
    await req.client.set("movies", JSON.stringify(data));

    res.status(201).json({ data, source: "from db" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
