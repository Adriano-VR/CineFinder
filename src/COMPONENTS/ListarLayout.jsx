import PropTypes from "prop-types";
import PaginationRounded from "./Pagination.jsx";
import Loader from "./Loader.jsx";
import { CirclePlay, Info } from "lucide-react";
import useGetMovieInformation from "../HOOKS/useGetMovieInformation.js";
import useGetSeriesInformation from "../HOOKS/useGetSeriesInformation.js";

import { useLocation, useNavigate, useParams } from "react-router-dom";

const ListarLayout = ({ arr, page, total_pages, setPage, loading }) => {
  const { getMoviesVideos } = useGetMovieInformation();
  const { getSeriesVideos } = useGetSeriesInformation();


  const params = useParams();
  const location = useLocation();
  const nav = useNavigate();

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTrailer = async (selectedMovieID) => {
     
    if (location.pathname.includes('filmes')) await getMoviesVideos(selectedMovieID);
     if (location.pathname.includes('tv')) await getSeriesVideos(selectedMovieID)
  };

  const handleInfoClick = (item) => {
    nav(`${location.pathname}/details/${item.id}`, { state: { key: item } });
  };

  if (loading ) {
    return <Loader />;
  }

  return (
    <div className="w-10/12 flex items-end py-10 flex-col m-auto text-[#FAA307]">
      <h1 className="font-semibold text-left text-2xl w-full py-5 capitalize">
        {params.category}
      </h1>
      <div className="flex flex-wrap gap-4 lg:items-center">
        {arr &&
          arr.map((item) => (
            <div key={item.id} className="relative flex rounded-lg">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  className="relative rounded"
                  alt=""
                />
              </div>

              <div className="absolute flex-col inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-95 opacity-0 hover:opacity-100 transition duration-300 ease-in-out rounded">
                <span className="text-inherit font-extrabold text-lg px-2 text-center">
                  {item.title ? item.title : item.original_name}
                </span>
                <div className="flex items-center gap-3 py-5 text-orange-500">
                  <CirclePlay
                    className="text-inherit size-12 cursor-pointer"
                    onClick={() => handleTrailer(item.id)}
                  />
                  <Info
                    className="size-12 cursor-pointer text-inherit"
                    onClick={() => handleInfoClick(item)}
                  />
                </div>
              </div>
            </div>
          ))}
        <PaginationRounded
          count={total_pages}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

ListarLayout.propTypes = {
  arr: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.number,
  total_pages: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default ListarLayout;
