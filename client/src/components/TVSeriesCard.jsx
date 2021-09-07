import { DELETE_TVSERIES_MUTATION, FETCH_ALL } from "../graphql";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { favoriteVar } from "../graphql/var";

export default function TVSeriesCard({ data }) {
  const history = useHistory();
  const favData = useReactiveVar(favoriteVar);

  const [deleteTvSeries] = useMutation(DELETE_TVSERIES_MUTATION, {
    refetchQueries: [FETCH_ALL],
  });

  const editTvSeries = (id) => {
    history.push(`/edit-tv-series/${id}`);
  };

  const detailsTvSeries = (id) => {
    history.push(`/details-tv-series/${id}`);
  };

  const removeTvSeries = (id) => {
    deleteTvSeries({
      variables: {
        _id: id,
      },
    });
  };

  const favTvSeries = (data) => {
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
          <button
            onClick={() => {
              detailsTvSeries(data._id);
            }}
          >
            <img className="w-full" src={data.poster_path} />
          </button>
          <div className="text-center absolute w-full -mt-9">
            <button
              className="btn btn-primary"
              onClick={() => {
                favTvSeries(data);
              }}
              className="p-4 rounded-full transition ease-in duration-200 focus:outline-none grad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
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
              editTvSeries(data._id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            className="flex justify-center"
            onClick={() => {
              detailsTvSeries(data._id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            className="flex justify-center"
            onClick={() => {
              removeTvSeries(data._id);
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
