import React from "react";
import { useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "../CSS/transtition.css"
import SectionMovies from "../COMPONENTS/SectionMovies.jsx";
import { WhatsURL } from "../UTILS/utils.js";
import InfoFilmesHomePage from "../COMPONENTS/InfoFilmesHomePage.jsx";
import { useParams } from "react-router-dom";

const HomePage = () => {

  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [index, setIndex] = React.useState(1);
  const [movies, setMovies] = React.useState([]);

  const {data} = WhatsURL('popular')
  
  useEffect(() => {
    async function fetchData() {
      setMovies(data)
      setSelectedMovie(data[index])
      

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
