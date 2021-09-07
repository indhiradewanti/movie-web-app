const { ObjectId } = require("mongodb");
const TVSeries = require("../models/TVSeries");

class TVSeriesController {
  static async getAll(req, res) {
    try {
      let tvSeries = await TVSeries.find();
      res.status(200).json(tvSeries);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getOne(req, res) {
    try {
      const query = {
        _id: ObjectId(req.params.id),
      };
      let tvSeries = await TVSeries.findOne(query);
      if (tvSeries.length === 0) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json(tvSeries);
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
      if (data.title && data.overview && data.poster_path && data.popularity && data.tags) {
        let tvSeries = await TVSeries.create(data);
        if (tvSeries) {
          res.status(201).json({ message: "New series has been added", tvSeries });
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
      let tvSeries = await TVSeries.update(query, { $set: newData });
      if (tvSeries) {
        res.status(200).json({ message: `Series ${newData.title} has been updated`, newData });
      } else {
        res.status(404).json({ message: "Data not found" });
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
      let tvSeries = await TVSeries.delete(query);

      if (!tvSeries.deletedCount) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json({ message: `Series with id ${req.params.id} has been deleted` });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = TVSeriesController;
