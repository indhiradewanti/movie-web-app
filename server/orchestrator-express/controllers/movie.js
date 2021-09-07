const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis();
const moviePort = "http://localhost:4001/movies";

class MovieController {
  static async getAll(req, res) {
    try {
      const getAllMovies = await redis.get("allMovies");
      if (getAllMovies) {
        res.status(200).json(JSON.parse(getAllMovies));
      } else {
        let movies = await axios.get(moviePort);
        const responseString = JSON.stringify(movies.data);

        await redis.set("allMovies", responseString);
        res.status(200).json(movies.data);
      }
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async getOne(req, res) {
    try {
      const getMovie = await redis.get(`${req.params.id}`);
      if (getMovie) {
        let movie = JSON.parse(getMovie)
        if (movie) {
          res.status(200).json(movie[0]);
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      } else {
        let movies = await axios.get(`${moviePort}/${req.params.id}`);
        if (!movies) {
          res.status(404).json({ message: "Data not found" });
        } else {
          res.status(200).json(movies.data);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async createData(req, res) {
    try {
      let data = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: +req.body.popularity,
        tags: req.body.tags,
      };
      let movies = await axios.post(moviePort, data);
      await redis.del("allData");
      await redis.del("allMovies");
      await redis.del("movie");
      res.status(201).json(movies.data);
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async updateData(req, res) {
    try {
      let newData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: +req.body.popularity,
        tags: req.body.tags,
      };
      let movies = await axios.put(`${moviePort}/${req.params.id}`, newData);
      await redis.del("allData");
      await redis.del("allMovies");
      await redis.del("movie");
      res.status(201).json(movies.data);
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async delete(req, res) {
    try {
      await redis.del("allData");
      await redis.del("allMovies");
      await redis.del("movie");
      let movies = await axios.delete(`${moviePort}/${req.params.id}`);
      res.status(200).json(movies.data);
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }
}

module.exports = MovieController;
