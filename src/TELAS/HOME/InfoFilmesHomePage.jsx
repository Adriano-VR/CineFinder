import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useGetInformation from "../../UTILS/movie.js";

const InfoFilmesHomePage = ({selectedMovie}) => {

    const {detailsFilmes} = useGetInformation({id: selectedMovie.id,tipo:"filmes"})


    const changeLanguage = () => {
    return localStorage.getItem("lang") === "pt-BR" ? "MAIS INFORMAÇÕES" : "MORE INFO"
  }

  const nav = useNavigate();
  
  const handleInfoClick = (item) => {
    nav(`${location.pathname}/filmes/details/${item.id}`, { state: { key: item } });
  };


  return (
    <div className="absolute z-10 linear text-white h-full w-full flex justify-center flex-col"
    style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, .5), #0d0d0d)" }}>
       <div className="pl-20 w-7/12">
            <h1 className="text-6xl font-bold tracking-wider">{selectedMovie.title}</h1>
                <div className="py-5 italic text-3xl tracking-wider text-zinc-100">
              {detailsFilmes.tagline ? <p>{detailsFilmes.tagline}</p> : null}
                </div>
            {detailsFilmes.genres && (
              <ul className="flex gap-4 list-disc">
                {detailsFilmes.genres.map((genre) => (
                  <li className="pr-4 first:list-none first:pl-0 text-sm italic" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-gray-100 text-lg leading-8 tracking-wide pt-5 ">{selectedMovie.overview}</p>
            <div className="pt-5 flex items-center gap-5">  
           
              <button className="bg-orange-300 p-3 rounded font-bold text-[#0d0d0d]" onClick={() =>   handleInfoClick(selectedMovie)}>

                {changeLanguage()}
              </button>
            </div>
        </div>
    </div>
  )
}

InfoFilmesHomePage.propTypes = {
    selectedMovie: PropTypes.object.isRequired,
    details: PropTypes.object,
  
  };

export default InfoFilmesHomePage
