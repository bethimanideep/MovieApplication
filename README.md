#  Movie Listing App [ MERN ] [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
## Overview

The Movie Listing App is a simple web application for managing and displaying a list of movies. It is built using the MERN stack (MongoDB, Express.js, React, and Node.js). The backend is set up to handle basic CRUD operations for movie data, and the frontend is a minimal React application that fetches and displays movie information from the backend.

### Frontend Deploy
#-[Live Frontend](https://movie-application-3olx.vercel.app/) 

### Backend Deploy
#-[Live Backend](https://movieapplication-d07u.onrender.com/)    

## Installation
   ```bash
  git clone https://github.com/bethimanideep/MovieApplication
  cd MovieApplication
  npm i
  node index.js
   ```
### .env

```bash
MONGODBURL=
REDISPASSWORD=
REDISURL=
   ```

### Mongodb Schema

The application uses MongoDB as the database for storing movie details.

```bash
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
  }
   ```

## Endpoints

### Destinations

- **POST /movies/ Create a new Movie
```bash
{
  "movieName": "Inception",
  "imageUrl": "url",
  "releaseYear": 2010
}
   ```

- **GET /movies/ Retrieve a list of all Movies
- **PUT /movies/ Update an existing Movie
- **DELETE /movies/:_id Delete a Movie

### Contact Information

For any queries and feedback, please contact me at [bethimanideep@gmail.com](mailto:bethimanideep@gmail.com).

---

<h1 align="center">✨Thank You✨</h1>

