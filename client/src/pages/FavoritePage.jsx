import { useReactiveVar } from "@apollo/client";
import { MovieCard, TVSeriesCard } from "../components";
import { favoriteVar } from "../graphql/var";

export default function FavoritePage() {
  const favData = useReactiveVar(favoriteVar);
  console.log(favData);
  const bg = `https://m.media-amazon.com/images/M/MV5BNTE4NDIwMDQ4OF5BMl5BanBnXkFtZTgwMDcyMDg2MTI@._V1_.jpg`
  return (
    <div>
      <div>
        <div className="w-full h-24 bg-yellow-900 bg-opacity-95 absolute top-0 left-0"></div>
        <div className="-mt-24 relative  w-screen h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }}>
          <div className="w-full h-screen bg-opacity-50 bg-black flex justify-center items-center relative">
            <div className="mx-4 text-center text-white">
              <h1 className="font-bold text-6xl mb-4 onto">Favorites</h1>
              <h2 className="font-bold text-4xl mb-12 ttt">here's your all favorites movies <br/>and tv series</h2>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">Favorites</h2>
        </div>
        <div className="grid gap-3 gap-x-8 grid-cols-4 mb-12 mx-20 data">
          {favData.map((fav, index) => {
            return (
              <div>
                {fav.__typename === "Movie" && <MovieCard data={fav} key={index}></MovieCard>}
                {fav.__typename === "TVSeries" && <TVSeriesCard data={fav} key={index}></TVSeriesCard>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
