import React from "react";
import { useEffect } from "react";
import { GET_POPULAR , GET_DETAILS_MOVIE} from "../ENDPOINTS/api.js" ;
import useFetch from "../HOOKS/useFetch.jsx";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "../CSS/transtition.css"
import SectionMovies from "./SectionMovies.jsx";

const HomePage = () => {

  const { request } = useFetch(); // Desestrutura o estado e métodos do hook useFetch
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [details, setDetails] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [movies, setMovies] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
    const { url, options } = GET_POPULAR(); // Obtém a URL e opções para a requisição GET
    const { json } = await request(url, options); // Faz a requisição e obtém a resposta
    setSelectedMovie(json.results[index])
    setMovies(json.results)
      details(json.results[index].id)
    }
 
    
    async function details(id) {
     
       const { url, options } = GET_DETAILS_MOVIE(id); // Obtém a URL e opções para a requisição GET
       const { json } = await request(url, options); // Faz a requisição e obtém a resposta
       setDetails(json)
    }

fetchData();
}, [request,index]);



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
    <div className="relative h-screen w-screen overflow-hidden">
      {selectedMovie && (
        <>
          <SwitchTransition mode="in-out">
            <CSSTransition
              key={selectedMovie.id} // Use movie ID as key
              timeout={2000} // Duration of animation in milliseconds
              classNames="fade" // CSS class names for transition
            >
              <div className="absolute inset-0">
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
                  alt={selectedMovie.title || "Movie Image"}
                  className="w-full h-full object-cover brightness-[0.3]"
                />
              </div>
            </CSSTransition>
          </SwitchTransition>

          <div className="relative z-10 pl-20 text-white h-full flex justify-center flex-col">
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
            <p className="text-gray-100 text-lg leading-7 pt-5 w-8/12">{selectedMovie.overview}</p>
            <div className="pt-5 flex items-center gap-5">
              <button className="bg-green-400 p-3 rounded">TRAILER</button>
              <button className="bg-orange-300 p-3 rounded">MORE INFO</button>
            </div>
          </div>
        </>
      )}
       
    </div>
      <SectionMovies category="pop" />
      <SectionMovies category="now" />
    </>
   
  );
};

export default HomePage;
