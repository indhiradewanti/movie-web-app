const { ObjectId } = require("mongodb");
const Movie = require("../models/movie");

class MovieController {
  static async getAll(req, res) {
    try {
      let movie = await Movie.find();
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const query = {
        _id: ObjectId(req.params.id),
      };
      let movie = await Movie.findOne(query);
      if (movie.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json(movie);
      }
    } catch (err) {
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
        tags: req.body.tags.split(","),
      };
      if (data.title && data.overview && data.poster_path && data.popularity && data.tags[0] !== "") {
        let movie = await Movie.create(data);
        if (movie) {
          res.status(201).json({ message: "New Movie has been added", movie });
        } else {
          res.status(400).json({ message: "please input all of the data" });
        }
      } else {
        res.status(400).json({ message: "please input all of the data" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateData(req, res) {
    try {
      const query = {
        _id: ObjectId(req.params.id),
      };
      let newData = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: +req.body.popularity,
        tags: req.body.tags.split(","),
      };
      if (newData.title && newData.overview && newData.poster_path && newData.popularity && newData.tags[0] !== "") {
        let movie = await Movie.update(query, { $set: newData });
        if (movie) {
          res.status(200).json({ message: `Movie ${newData.title} has been updated`, newData });
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      } else {
        res.status(400).json({ message: "please input all of the data" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const query = {
        _id: ObjectId(req.params.id),
      };
      let movie = await Movie.delete(query);
      if (!movie.deletedCount) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json({ message: `Movie with id ${req.params.id} has been deleted` });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = MovieController;
