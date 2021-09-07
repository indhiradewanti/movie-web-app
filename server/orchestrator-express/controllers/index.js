const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis();
const moviePort = "http://localhost:4001/movies";
const TVSeriesPort = "http://localhost:4002/tv-series";

class Controller {
  static async getAll(req, res) {
    try {
      const getAllData = await redis.get("allData");
      if (getAllData) {
        res.status(200).json(JSON.parse(getAllData));

      } else {
        let movies = await axios.get(moviePort);
        let TVSeries = await axios.get(TVSeriesPort);

        movies = movies.data;
        TVSeries = TVSeries.data;
        const responseString = JSON.stringify({movies, TVSeries});

        await redis.set("allData", responseString);
        res.status(200).json({ movies, TVSeries });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = Controller;
