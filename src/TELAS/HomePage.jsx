import React from "react";
import { useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "../CSS/transtition.css"
import SectionMovies from "../COMPONENTS/SectionMovies.jsx";
import { WhatsURL } from "../UTILS/utils.js";

const HomePage = () => {

  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [index, setIndex] = React.useState(1);
  const [movies, setMovies] = React.useState([]);

  const {data,getDetails, details} = WhatsURL('popular')
  
  useEffect(() => {
    async function fetchData() {
      setMovies(data)
      setSelectedMovie(data[index])
      getDetails(data[index].id)
      console.log(data[index].id);
    }
 
fetchData();
}, [index,data]);



  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[index]);
     
    }
  }, [index, movies]);
    




  return (
    <>
    <div className="relative h-[93vh]  overflow-hidden">
      {selectedMovie && (
        <>
          <SwitchTransition mode="in-out">
            <CSSTransition
              key={selectedMovie.id} // Use movie ID as key
              timeout={1000} // Duration of animation in milliseconds
              classNames="fade" // CSS class names for transition
            >
              <div className="absolute">
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
                  alt={selectedMovie.title || "Movie Image"}
                  className="object-contain"
                />
              </div>
            </CSSTransition>
          </SwitchTransition>

          <div className="absolute z-10 linear text-white h-full w-full flex justify-center flex-col"
            style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, .5), #0d0d0d)" }}>
              <div className="pl-20 w-7/12">
          {/* fazer um component para as info */}

            <h1 className="text-6xl font-bold tracking-wider">{selectedMovie.title}</h1>
            <div className="py-5 italic text-3xl tracking-wider text-zinc-100">
              {details.tagline && <p>{details.tagline}</p>}
            </div>
            {details.genres && (
              <ul className="flex gap-4 list-disc">
                {details.genres.map((genre) => (
                  <li className="pr-4 first:list-none first:pl-0 text-sm italic" key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-gray-100 text-lg leading-8 tracking-wide pt-5 ">{selectedMovie.overview}</p>
            <div className="pt-5 flex items-center gap-5">
              <button className="bg-green-300 p-3 rounded font-bold text-[#0d0d0d]">TRAILER</button>
              <button className="bg-orange-300 p-3 rounded font-bold text-[#0d0d0d]">MORE INFO</button>
            </div>
          </div>
        </div>
        </>
      )}
       
    </div>
      <SectionMovies category="popular" />
      <SectionMovies category="nowplaying" />
      <SectionMovies category="toprated" />
    </>
   
  );
};

export default HomePage;
