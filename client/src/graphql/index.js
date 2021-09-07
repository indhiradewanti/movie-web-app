import { gql } from "@apollo/client";

export const FETCH_ALL = gql`
  query FetchAll {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FETCH_TVSERIES = gql`
  query FetchTVSeries {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FETCH_ONE_TVSERIES = gql`
  query FetchOneTVSeries($_id: ID) {
    tvSeriesOne(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_TVSERIES_MUTATION = gql`
  mutation addTvSeriesMutation($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: String) {
    addTvSeries(title: $title, overview: $overview, popularity: $popularity, poster_path: $poster_path, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const EDIT_TVSERIES_MUTATION = gql`
  mutation editTvSeriesMutation($_id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: String) {
    editTvSeries(_id: $_id, title: $title, overview: $overview, popularity: $popularity, poster_path: $poster_path, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_TVSERIES_MUTATION = gql`
  mutation deleteTvSeriesMutation($_id: ID) {
    deleteTvSeries(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FETCH_MOVIES = gql`
  query FetchMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const FETCH_MOVIE = gql`
  query FetchMovie($_id: ID) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE_MUTATION = gql`
  mutation addMovieMutation($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: String) {
    addMovie(title: $title, overview: $overview, popularity: $popularity, poster_path: $poster_path, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const EDIT_MOVIE_MUTATION = gql`
  mutation editMovieMutation($_id: ID, $title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: String) {
    editMovie(_id: $_id, title: $title, overview: $overview, popularity: $popularity, poster_path: $poster_path, tags: $tags) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE_MUTATION = gql`
  mutation deleteMovieMutation($_id: ID) {
    deleteMovie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
