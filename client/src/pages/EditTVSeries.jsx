import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { EDIT_TVSERIES_MUTATION, FETCH_ALL, FETCH_ONE_TVSERIES } from "../graphql";

export default function EditPage() {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(FETCH_ONE_TVSERIES, {
    variables: {
      _id: id,
    },
  });
  const [tvSeries, setTvSeries] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: "",
  });
  // const [tags, setTags] = useState("");
  const { title, overview, poster_path, popularity, tags } = tvSeries;
  const [editTvSeries] = useMutation(EDIT_TVSERIES_MUTATION, {
    refetchQueries: [FETCH_ALL],
  });
  console.log(data);
  useEffect(() => {
    if (!loading) {
      setTvSeries(data.tvSeriesOne);
    }
  }, [data]);

  const input = (e) => {
    let { name, value } = e.target;
    setTvSeries({ ...tvSeries, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    editTvSeries({
      variables: {
        _id: id,
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: +popularity,
        tags: tags,
      },
    });
    history.push("/");
  };

  if (loading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  const background = `https://m.media-amazon.com/images/M/MV5BNDQ4MGVkYmUtZTdhNi00YTZhLWI4ZWItNTY0MDhiNjQ5YzA3XkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg`;
  return (
    <div className="flex justify-center">
      <div className="-mt-24 relative w-screen bg-center bg-no-repeat bg-cover bg-yellow-900 bg-opacity-95 top-0 left-0" style={{ backgroundImage: `url(${background})` }}>
        <div class="max-w-xl mx-auto text-center py-36">
          <div class="w-24 h-2 bg-nude1 mx-auto"></div>
          <h2 class="font-display font-bold text-3xl md:text-4xl text-white mt-3">Edit TV Series</h2>
          <form onSubmit={handleSubmit} className="glass form-control mt-6 w-auto px-10 py-10 ">
            <label class="label">
              <span class="label-text text-white">Title</span>
            </label>
            <input id="title" type="text" name="title" value={title} onChange={input} class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Overview</span>
            </label>
            <input id="overview" type="text" name="overview" value={overview} onChange={input} class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Poster Path</span>
            </label>
            <input id="poster_path" type="text" name="poster_path" value={poster_path} onChange={input} class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Popularity</span>
            </label>
            <input id="popularity" type="number" step="any" name="popularity" value={popularity} onChange={input} class="input input-info input-bordered" />
            <label class="label">
              <span class="label-text text-white">Tags</span>
            </label>
            <input id="tags" type="text" name="tags" value={tags} onChange={input} class="input input-info input-bordered" />
            <button type="submit" class="btn btn-outline1 mt-10 w-52 mx-auto">
              Edit TV Series
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
