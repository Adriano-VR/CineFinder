  import PropTypes from "prop-types";
  import PaginationRounded from "./Pagination";
  import Loader from "./Loader";
  import { ReactComponent as IconPlay } from '../SVG/play-circle-svgrepo-com.svg';

  const ListarSeeAll = ({ arr, category, page, total_pages, setPage,loading }) => {
  

      if (loading) {
        return <Loader />;
      }

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    return (
      <div className="w-10/12 flex items-end py-10 flex-col m-auto text-[#FAA307]">
      
        <h1 className="font-semibold text-left text-2xl w-full py-5 ">
          {category}
        </h1>
        <div className="flex flex-wrap  gap-4">
          {arr &&
            arr.map((item) => (
              <div key={item.id} className=" relative flex rounded-lg ">
                <div className=" ">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    className="relative rounded"
                    alt=""
                  />
                </div>
                
                    <div className=" absolute flex-col inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-95 opacity-0 hover:opacity-100 transition duration-300 ease-in-out rounded">
                    
                    <span className="text-inherit font-extrabold text-lg">{item.title ? item.title : item.original_name}</span>
                    <IconPlay />
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
  ListarSeeAll.propTypes = {
    arr: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    page: PropTypes.number,
    total_pages: PropTypes.number,
    setPage: PropTypes.func,
    loading: PropTypes.bool,
  };
  export default ListarSeeAll;
