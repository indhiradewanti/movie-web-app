import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { FETCH_ALL, DELETE_MOVIE_MUTATION, FETCH_MOVIE } from "../graphql";
import { favoriteVar } from "../graphql/var";

export default function DetailsPage() {
  const favData = useReactiveVar(favoriteVar);
  const history = useHistory();
  const { id } = useParams();
  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
  } = useQuery(FETCH_MOVIE, {
    variables: {
      _id: id,
    },
  });
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
    refetchQueries: [FETCH_ALL],
  });

  const remove = (id) => {
    deleteMovie({
      variables: {
        _id: id,
      },
    });
    history.push("/");
  };

  const edit = (id) => {
    history.push(`/edit-movie/${id}`);
  };

  const favMovie = (data) => {
    let newFav = [...favData, data];
    favoriteVar(newFav);
    console.log("masuk ke fav", favData);
  };

  if (movieLoading) {
    return <h1>LOADING</h1>;
  }

  if (movieError) {
    return <h1>ERROR</h1>;
  }

  const bg = `https://m.media-amazon.com/images/M/MV5BNDQ4MGVkYmUtZTdhNi00YTZhLWI4ZWItNTY0MDhiNjQ5YzA3XkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg`;

  return (

    <div>
    <div className="w-full h-24 bg-yellow-900 bg-opacity-95 absolute top-0 left-0"></div>
    <div className="-mt-24 relative w-screen h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      <div className="w-full h-screen bg-opacity-50 bg-black flex justify-center items-center relative">
      <section className="text-gray-700 body-font overflow-hidden justify-center items-center align-middle">
        <div className="container px-5 py-24 mx-auto">
          <div className=" mx-auto flex flex-wrap justify-center items-center">
            <img alt="ecommerce" className="w-60 object-cover object-center rounded border border-gray-200" src={movieData.movie.poster_path} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-white tracking-widest">MOVIE TITLE</h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">{movieData.movie.title}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white ml-3">{movieData.movie.popularity}</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <div className="text-center">
                    {movieData.movie.tags.map((tag) => {
                      return <kbd className="kbd kbd-xs mx-2">{tag}</kbd>;
                    })}
                  </div>
                </span>
              </div>
              <p className="leading-relaxed text-white">{movieData.movie.overview}</p>
              <div className="flex mt-6 items-center border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                </div>
              </div>
              <div className=" text-center tracking-wide grid grid-cols-3 gap-6">
                <button
                  className="flex justify-center"
                  onClick={() => {
                    edit(movieData.movie._id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  className="flex justify-center"
                  onClick={() => {
                    remove(movieData.movie._id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  className="flex justify-center"
                  onClick={() => {
                    favMovie(movieData.movie);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  </div>
  );
}
