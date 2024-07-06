import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PaginationRounded from "./Pagination";
import Loader from "./Loader";

const ListarSeeAll = ({ arr, category, page, infopage, setPage,loading }) => {


    if (loading) {
      return <Loader />;
    }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-10/12 flex items-end  flex-col m-auto">
      <Link to="/">Home</Link>
      <h1 className="font-semibold text-left text-2xl w-full py-5 ">
        {category}
      </h1>
      <div className="flex flex-wrap  gap-4">
        {arr &&
          arr.map((item) => (
            <div key={item.id} className=" flex rounded-lg">
              <div className=" transform hover:scale-105 hover transition duration-300 ease-in-out cursor-pointer  ">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  className="relative rounded"
                  alt=""
                />
              </div>
            </div>
          ))}

       
        <PaginationRounded
          count={infopage}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
ListarSeeAll.propTypes = {
  arr: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  infopage: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default ListarSeeAll;
