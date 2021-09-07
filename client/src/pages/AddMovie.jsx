import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ADD_MOVIE_MUTATION, FETCH_ALL } from "../graphql";

export default function AddPage() {
  const history = useHistory();
  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: "",
  });
  const { title, overview, poster_path, popularity, tags } = movie;
  const [addMovie] = useMutation(ADD_MOVIE_MUTATION, {
    refetchQueries: [FETCH_ALL],
  });

  const input = (e) => {
    let { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  console.log(title, overview, poster_path, popularity, tags);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({
      variables: {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: +popularity,
        tags: tags,
      },
    });
    history.push("/");
  };
  const background = `https://m.media-amazon.com/images/M/MV5BNDQ4MGVkYmUtZTdhNi00YTZhLWI4ZWItNTY0MDhiNjQ5YzA3XkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg`;
  return (
    <div className="flex justify-center">
      <div className="-mt-24 relative w-screen bg-center bg-no-repeat bg-cover bg-yellow-900 bg-opacity-95 top-0 left-0" style={{ backgroundImage: `url(${background})` }}>
        <div class="max-w-xl mx-auto text-center py-36">
          <div class="w-24 h-2 bg-nude1 mx-auto"></div>
          <h2 class="font-display font-bold text-3xl md:text-4xl text-white mt-3">Add New Movie</h2>
          <form onSubmit={handleSubmit} className="glass form-control mt-6 w-auto px-10 py-10 ">
            <label class="label">
              <span class="label-text text-white">Title</span>
            </label>
            <input id="title" type="text" name="title" value={title} onChange={input} placeholder="e.g Kissing Booth" class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Overview</span>
            </label>
            <input id="overview" type="text" name="overview" value={overview} onChange={input} placeholder="overview" class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Poster Path</span>
            </label>
            <input id="poster_path" type="text" name="poster_path" value={poster_path} onChange={input} placeholder="e.g https://m.media-amazon.com/images/M/MV5BNVyOTc5MDI5NjE@._V1_.jpg" class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Popularity</span>
            </label>
            <input id="popularity" type="number" step="any" name="popularity" value={popularity} onChange={input} placeholder="e.g 3.5" class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Tags</span>
            </label>
            <input id="tags" type="text" name="tags" value={tags} onChange={input} placeholder="e.g Comedy, Romance" class="input input-info input-bordered" />
            <button type="submit" class="btn btn-outline1 mt-10 w-52 mx-auto">
              Add New Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
