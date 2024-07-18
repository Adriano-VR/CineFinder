import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useGetMovieInformation from "../../HOOKS/useGetMovieInformation";
import { useEffect, useState } from "react";

const InfoFilmesHomePage = ({ selectedMovie }) => {
  const { movieDetails, getDetails } = useGetMovieInformation();

  
  const fetch = async () => {
    await getDetails({ id : selectedMovie.id })
  }

  useEffect (() => {
    fetch()
  },[])



  const changeLanguage = () => {
    return localStorage.getItem("lang") === "pt-BR" ? "MAIS INFORMAÇÕES" : "MORE INFO";
  };

  const nav = useNavigate();

  const handleInfoClick = (item) => {
    nav(`${location.pathname}/filmes/details/${item.id}`, { state: { key: item } });
  };


  return (
    <div className="grid grid-cols-1 sm:flex sm:relative md:absolute z-10 text-white h-full w-full justify-center flex-col overflow-hidden flex-wrap"
         style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, .5), #0d0d0d)" }}>
      <div className="sm:pl-10 sm:w-10/12 md:pl-20 md:w-7/12">
        <h1 className="2xl:text-6xl xl:text-4xl font-bold tracking-wider">{selectedMovie.title}</h1>
        <div className="py-3 sm:py-4 md:py-5 italic text-2xl sm:text-2xl md:text-3xl tracking-wider text-zinc-100">
          {movieDetails.tagline ? <p>{movieDetails.tagline}</p> : null}
        </div>
        {movieDetails.genres && (
          <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 list-disc">
            {movieDetails.genres.map((genre) => (
              <li className="pr-2 sm:pr-3 md:pr-4 first:list-none first:pl-0 text-xs sm:text-sm md:text-sm italic" key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
        )}
        <p className="text-gray-100 text-base sm:text-lg md:text-lg leading-6 sm:leading-7 md:leading-8 tracking-wide pt-3 sm:pt-4 md:pt-5">
          {selectedMovie.overview}
        </p>
        <div className="pt-3 sm:pt-4 md:pt-5 flex items-center gap-3 sm:gap-4 md:gap-5">
          <button className="bg-orange-300 p-2 sm:p-2.5 md:p-3 rounded font-bold text-[#0d0d0d]" onClick={() => handleInfoClick(selectedMovie)}>
            {changeLanguage()}
          </button>
        </div>
      </div>
    </div>
  );
};

InfoFilmesHomePage.propTypes = {
  selectedMovie: PropTypes.object.isRequired,
};

export default InfoFilmesHomePage;
