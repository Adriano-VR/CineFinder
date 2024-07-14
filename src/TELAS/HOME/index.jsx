import React from "react";
import { useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "../../CSS/transtition.css"
import SectionMovies from "../../TELAS/HOME/SectionMovies.jsx";
import { useChangeCategory } from "../../HOOKS/useChangeCategory.js";
import InfoFilmesHomePage from "../../TELAS/HOME/InfoFilmesHomePage.jsx";

const HomePage = () => {

  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [index, setIndex] = React.useState(1);
  const [movies, setMovies] = React.useState([]);

  const {data} = useChangeCategory('popular')
  
  useEffect(() => {
    async function fetchData() {
      setMovies(data)
      setSelectedMovie(data[index])
    }
 
fetchData();
}, [index,data]);

//tirar daqui e fazer direto no hook

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[index]);
     
    }
  }, [index, movies]);
    

  return (
    <>
    <div className="relative md:h-[93vh]   md:overflow-hidden">
      {selectedMovie && (
        <>
          <SwitchTransition mode="in-out">
            <CSSTransition
              key={selectedMovie.id} // Use movie ID as key
              timeout={1000} // Duration of animation in milliseconds
              classNames="fade" // CSS class names for transition
            >
              <div className="hidden md:absolute md:block">
                <img
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
                  alt={selectedMovie.title || "Movie Image"}
                  className="object-contain"
                />
              </div>
            </CSSTransition>
          </SwitchTransition>

         
             <InfoFilmesHomePage selectedMovie={selectedMovie}  />
    
        </>
      )}
       
    </div>
      <SectionMovies category="popular"  />
      <SectionMovies category="nowplaying"  />
      <SectionMovies category="toprated"  />
    </>
   
  );
};

export default HomePage;
