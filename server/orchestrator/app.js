const { ApolloServer, gql } = require("apollo-server");
const moviePort = "http://localhost:4001/movies";
const TVSeriesPort = "http://localhost:4002/tv-series";
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type TVSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type AllData {
    movies: [Movie]
    TVSeries: [TVSeries]
  }

  type Query {
    allData: AllData
    movies: [Movie]
    movie(_id: ID): Movie
    tvSeries: [TVSeries]
    tvSeriesOne(_id: ID): TVSeries
  }

  type Mutation {
    addMovie(title: String, overview: String, poster_path: String, popularity: Float, tags: String): Movie
    editMovie(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: String): Movie
    deleteMovie(_id: ID): Movie
    addTvSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: String): Movie
    editTvSeries(_id: ID, title: String, overview: String, poster_path: String, popularity: Float, tags: String): Movie
    deleteTvSeries(_id: ID): Movie
  }
`;

const resolvers = {
  Query: {
    async allData() {
      try {
        const getAllData = await redis.get("allData");
        if (getAllData) {
          return JSON.parse(getAllData);
        } else {
          let movies = await axios.get(moviePort);
          let TVSeries = await axios.get(TVSeriesPort);
          movies = movies.data;
          TVSeries = TVSeries.data;
          const responseString = JSON.stringify({ movies, TVSeries });
          await redis.set("allData", responseString);
          return { movies, TVSeries };
        }
      } catch (err) {
        return err;
      }
    },
    async movies() {
      try {
        const getAllMovies = await redis.get("allMovies");
        if (getAllMovies) {
          return JSON.parse(getAllMovies);
        } else {
          let movies = await axios.get(moviePort);
          const responseString = JSON.stringify(movies.data);
          await redis.set("allMovies", responseString);
          console.log(movies.data);
          return movies.data;
        }
      } catch (err) {
        return err;
      }
    },
    async movie(_, args) {
      try {
        let movies = await axios.get(`${moviePort}/${args._id}`);
        await redis.set(`${args._id}`, movies.data);
        return movies.data[0];
      } catch (err) {
        return err;
      }
    },
    async tvSeries() {
      try {
        const getAllTVSeries = await redis.get("allTVSeries");
        if (getAllTVSeries) {
          return JSON.parse(getAllTVSeries);
        } else {
          let tvSeries = await axios.get(TVSeriesPort);
          const responseString = JSON.stringify(tvSeries.data);
          await redis.set("allTVSeries", responseString);
          return tvSeries.data;
        }
      } catch (err) {
        return err
      }
    },
    async tvSeriesOne(_, args) {
      try {
        let tvSeries = await axios.get(`${TVSeriesPort}/${args._id}`);
        await redis.set(`${args._id}`, tvSeries.data);
        return tvSeries.data[0];
      } catch (err) {
        return err
      }
    },
  },
  Mutation: {
    async addMovie(_, args) {
      try {
        const { title, overview, poster_path, popularity, tags } = args;
        let movie = await axios.post(`${moviePort}`, {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        });
        await redis.del("allMovies");
        await redis.del("allData");
        console.log(movie.data);
        return movie.data;
      } catch (err) {
        return err;
      }
    },
    async editMovie(_, args) {
      try {
        const { title, overview, poster_path, popularity, tags } = args;
        let movie = await axios.put(`${moviePort}/${args._id}`, {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        });
        await redis.del("allMovies");
        await redis.del("allData");
        await redis.del(`${args._id}`);
        return movie.data;
      } catch (err) {
        return err;
      }
    },
    async deleteMovie(_, args) {
      try {
        const movie = await axios.delete(`${moviePort}/${args._id}`);
        await redis.del("allMovies");
        await redis.del("allData");
        await redis.del(`${args._id}`);
        return movie.data;
      } catch (err) {
        return err;
      }
    },
    async addTvSeries(_, args) {
      try {
        const { title, overview, poster_path, popularity, tags } = args;
        let tvSeries = await axios.post(`${TVSeriesPort}`, {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        });
        await redis.del("allTVSeries");
        await redis.del("allData");
        return tvSeries.data;
      } catch (err) {
        return err;
      }
    },
    async editTvSeries(_, args) {
      try {
        const { title, overview, poster_path, popularity, tags } = args;
        const tvSeries = await axios.put(`${TVSeriesPort}/${args._id}`, {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        });
        await redis.del("allTVSeries");
        await redis.del("allData");
        await redis.del(`${args._id}`);
        return tvSeries.data;
      } catch (err) {
        return err;
      }
    },
    async deleteTvSeries(_, args) {
      try {
        const tvSeries = await axios.delete(`${TVSeriesPort}/${args._id}`);
        await redis.del("allTVSeries");
        await redis.del("allData");
        await redis.del(`${args._id}`);
        return tvSeries.data;
      } catch (err) {
        return err;
      }
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log("Apollo listening on url", url);
});
