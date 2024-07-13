import PropTypes from "prop-types";
  import Circle from "../../SVG/circle.jsx";
  import {TvMinimalPlay} from "lucide-react";
  import Loader from "../../COMPONENTS/Loader.jsx"

const ShowDetailsMovies = ({ elenco,diretor,detalhes }) => {
 
  const formattedVoteAverage = String(detalhes.vote_average).replace(".", "").slice(0,2);



  return (
    
    <div className=" flex flex-col  items-center justify-center   text-zinc-300">
      <div className="relative flex gap-5 h-[93vh] items-center  justify-center w-full overflow-hidden">
        <div className="absolute inset-0 ">
          <img
            src={`https://image.tmdb.org/t/p/original/${detalhes.backdrop_path}`}
            alt=""
            className="object-contain"
          />
        </div>

        <div className="absolute z-50 flex items-center justify-center h-full w-full gap-5"
          style={{background:"linear-gradient(to bottom, rgba(0, 0, 0, .9), #0d0d0d)",}} >
          <div className="flex gap-5 justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w300/${detalhes.poster_path}`}  />
         
          <div className="flex flex-col w-7/12">
              
            <h1 className="text-4xl font-bold tracking-wider">
              {detalhes.title}
            </h1>
            <span className="font-bold">{detalhes.release_date}</span>
            {detalhes.genres && (
              <ul className="flex gap-4 list-disc py-3  ">
                {detalhes.genres.map((genre) => (
                  <li
                    className="pr-4 first:list-none first:pl-0 text-sm italic"
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
             <span className="py-3 font-bold text-lg">{detalhes.tagline}</span>
              <div className=" flex gap-5  items-center ">
                <div className="size-12   ">
                <Circle por={formattedVoteAverage } />
                </div>
               <TvMinimalPlay className="size-12"/>
                </div>
            
            <p className="text-gray-100 text-lg leading-8 tracking-wide py-5 flex-1 ">
              {detalhes.overview}
            </p>

            
             
              {diretor &&
              <div>
               
              <h1 className="text-lg">{diretor.name}</h1>
              <h3 className="italic">Director</h3>
              </div>
               
              }
          
              
          </div>
          </div>    
        </div>
      </div>

      <div className="flex  gap-3 items-center justify-center w-11/12 m-auto py-11 ">
        <div className="flex flex-col gap-5">
          <h2 className="capitalize text-xl font-semibold">elenco principal</h2>
          <div className="flex gap-5">
            {elenco &&
            elenco.map((genre) => (
              <div
                className="text-ellipsis w-44 h-72  shadow  shadow-zinc-700 rounded-lg overflow-hidden   "
                key={genre.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300/${genre.profile_path}`}
                  className="object-cover w-full size-40  "
                />

                <div className="flex items-center justify-center p-2  w-full">
                  <span className="font-bold">{genre.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
ShowDetailsMovies.propTypes = {
  elenco: PropTypes.array.isRequired,
  diretor: PropTypes.object.isRequired,
  detalhes: PropTypes.array.isRequired,

};


export default ShowDetailsMovies;
