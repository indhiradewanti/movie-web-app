import { DELETE_MOVIE_MUTATION, FETCH_ALL } from "../graphql";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { favoriteVar } from "../graphql/var";

export default function MovieCard({ data }) {
  const favData = useReactiveVar(favoriteVar);

  const history = useHistory();
  const [deleteMovie] = useMutation(DELETE_MOVIE_MUTATION, {
    refetchQueries: [FETCH_ALL],
  });

  const removeMovie = (id) => {
    deleteMovie({
      variables: {
        _id: id,
      },
    });
  };

  const editMovie = (id) => {
    history.push(`/edit-movie/${id}`);
  };

  const detailsMovie = (id) => {
    history.push(`/details-movie/${id}`);
  };

  const favMovie = (data) => {
    favData.map((e) => {
      if (data._id === e._id) {
        alert("already favorited");
      } else {
        let newFav = [...favData, data];
        favoriteVar(newFav);
        console.log("masuk ke fav", favData);
      }
    });
  };


  return (
    <div className=" flex justify-center items-center content-center ">
      <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white w-60 image-full">
        <div className="relative">
          {}
          <button
            onClick={() => {
              detailsMovie(data._id);
            }}
          >
            <img className="w-full" src={data.poster_path} />
          </button>
          <div className="text-center absolute w-full -mt-9">
            <button
              className="btn btn-primary"
              onClick={() => {
                favMovie(data);
              }}
              className="p-4 rounded-full transition ease-in duration-200 focus:outline-none grad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="place-self-center grid justify-items-center mt-10 font-bold">
          <span className="items-center text-gray-800 text-l txt text-center">{data.title}</span>
          <div className="text-center">
            {data.tags.map((tag) => {
              return <kbd className="kbd kbd-xs">{tag}</kbd>;
            })}
          </div>
        </div>
        <div className="py-8 px-6 text-center tracking-wide grid grid-cols-3 gap-6">
          <button
            className="flex justify-center"
            onClick={() => {
              editMovie(data._id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            className="flex justify-center"
            onClick={() => {
              detailsMovie(data._id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            className="flex justify-center"
            onClick={() => {
              removeMovie(data._id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
