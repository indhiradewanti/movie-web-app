import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { FETCH_ALL } from "../graphql";
import bg from "../assets/hero.jpg";
import { MovieCard, TVSeriesCard } from "../components";

export default function HomePage() {
  const history = useHistory();
  const { data, loading, error } = useQuery(FETCH_ALL);
  const addMovie = () => {
    history.push(`/add-movie`);
  };

  const addTvSeries = () => {
    history.push(`/add-tv-series`);
  };

  if (loading) {
    return <h1>LOADING</h1>;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }
  console.log(data);
  return (
    <div>
      <div className="w-full h-24 bg-yellow-900 bg-opacity-95 absolute top-0 left-0"></div>
      <div className="-mt-24 relative  w-screen h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }}>
        <div className="w-full h-screen bg-opacity-50 bg-black flex justify-center items-center relative">
          <div className="mx-4 text-center text-white">
            <h1 className="font-bold text-6xl mb-4 onto">Best Movies</h1>
            <h2 className="font-bold text-4xl mb-12 cigra">Always come from here</h2>
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">Movies</h2>
        <p className="font-light text-gray-600 mb-6 leading-relaxed">We always give you the best movies</p>
        <button className="btn btn-outline" onClick={addMovie}>
          Add New Movie
        </button>
      </div>
      <div className="grid gap-3 gap-x-8 grid-cols-4 mb-12 mx-20 data">
        {data.movies.map((movie, index) => {
          return <MovieCard data={movie} key={index} />;
        })}
      </div>
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">TV Series</h2>
        <p className="font-light text-gray-600 mb-6 leading-relaxed">We always give you the best TV Series</p>
        <button className="btn btn-outline" onClick={addTvSeries}>
          Add New TV Series
        </button>
      </div>
      <div className="grid gap-3 gap-x-8 grid-cols-4 mx-20 mb-12 data">
        {data.tvSeries.map((tvSeries, index) => {
          return <TVSeriesCard data={tvSeries} key={index} />;
        })}
      </div>
    </div>
  );
}
