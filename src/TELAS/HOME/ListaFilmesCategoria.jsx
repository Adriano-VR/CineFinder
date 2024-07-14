import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {CircleArrowRight}  from "lucide-react"

const SectionFilmesCategoriaHome = ({ arr, category }) => {
 
  const formattedCategory = category.toLowerCase().replace(/ /g, "-");
  const urlPath = `${formattedCategory}`;

  return (
   <div className="  flex flex-col gap-4 sm:gap-5 md:w-11/12 py-6   text-[#FAA307]">
    <div className="flex justify-between items-center">
        <h1 className="font-semibold text-left text-xl sm:text-2xl sm:w-screen sm:p-0 tracking-wide">{category}</h1>
        <div className="flex items-center justify-center">
            <Link to={`${urlPath}`}>
                <CircleArrowRight className="size-6 sm:size-9" />
            </Link>
        </div>
    </div>
    <div className="flex gap-2 sm:gap-4">
        {arr &&
            arr.slice(0, 8).map((item) => (
                <div key={item.id} className="relative overflow-hidden rounded-lg ">
                    <div className="transform hover:scale-110 transition duration-300 ease-in-out cursor-pointer ">
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                            className="relative rounded"
                            alt=""
                        />
                    </div>
                </div>
            ))}
    </div>
</div>

  );
};

SectionFilmesCategoriaHome.propTypes = {
  arr: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default SectionFilmesCategoriaHome;
