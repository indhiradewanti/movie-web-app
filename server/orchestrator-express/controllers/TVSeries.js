const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis();
const TVSeriesPort = "http://localhost:4002/tv-series";

class TVSeriesController {
  static async getAll(req, res) {
    try {
      const getAllTVSeries = await redis.get("allTVSeries");
      if (getAllTVSeries) {
        res.status(200).json(JSON.parse(getAllTVSeries));
      } else {
        let tvSeries = await axios.get(TVSeriesPort);
        const responseString = JSON.stringify(tvSeries.data);

        await redis.set("allTVSeries", responseString);
        res.status(200).json(tvSeries.data);
      }
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async getOne(req, res) {
    try {
      const getTvSeries = await redis.get(`${req.params.id}`);
      if (getTvSeries) {
        let tvSeries = JSON.parse(getTvSeries)
        if (tvSeries) {
          res.status(200).json(tvSeries[0]);
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      } else {
        let tvSeries = await axios.get(`${TVSeriesPort}/${req.params.id}`);
        if (!tvSeries) {
          res.status(404).json({ message: "Data not found" });
        } else {
          res.status(200).json(tvSeries.data);
        }
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
      let tvSeries = await axios.post(TVSeriesPort, data);
      await redis.del("allData");
      await redis.del("allTVSeries");
      await redis.del("tvSeries");
      res.status(201).json(tvSeries.data);
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
        tags: req.body.tags.split(","),
      };
      let tvSeries = await axios.put(`${TVSeriesPort}/${req.params.id}`, newData);
      await redis.del("allData");
      await redis.del("allTVSeries");
      await redis.del("tvSeries");
      res.status(201).json(tvSeries.data);
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async delete(req, res) {
    try {
      await redis.del("allData");
      await redis.del("allTVSeries");
      await redis.del("tvSeries");
      let tvSeries = await axios.delete(`${TVSeriesPort}/${req.params.id}`);
      res.status(200).json(tvSeries.data);
    } catch (err) {
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }
}

module.exports = TVSeriesController;
