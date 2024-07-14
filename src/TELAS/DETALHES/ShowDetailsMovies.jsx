import PropTypes from "prop-types";
  import Circle from "../../SVG/circle.jsx";
  import {TvMinimalPlay} from "lucide-react";
  import { format } from 'date-fns';
  import { ptBR } from 'date-fns/locale';


const ShowDetailsMovies = ({ elenco,diretor,detalhes }) => {
 
  const formattedVoteAverage = String(detalhes.vote_average).replace(".", "").slice(0,2);
 
 const releaseDate = detalhes.release_date && format(new Date(detalhes.release_date), 'MMMM yyyy', { locale: ptBR });

const  hours = Math.floor(detalhes.runtime / 60);
const minutes = detalhes.runtime % 60
const duracao = `${hours}h ${minutes}min`

  return (
    
    
      <div className="relative flex gap-5 h-[93vh]  w-full overflow-hidden text-gray-100">
        <div className="absolute inset-0 ">
          <img
            src={`https://image.tmdb.org/t/p/original/${detalhes.backdrop_path}`}
            alt=""
            className="object-contain"
          />
        </div>

        <div className="absolute z-50 flex flex-col h-full w-full gap-5"
          style={{background:"linear-gradient(to bottom, rgba(0, 0, 0, .9), #0d0d0d)",}} >
          <div className="flex gap-5 w-9/12 shadow-sm  shadow-zinc-700/50 m-auto items-center justify-center rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w300/${detalhes.poster_path}`} className="object-contain"  />
         
          <div className="flex flex-col w-full h-full p-3">
              
            <h1 className="text-4xl font-bold tracking-wider"> {detalhes.title} </h1>
              <ul className="flex gap-5 list-disc py-1 ">
                <li className="first:list-none pr-2">{duracao}</li>
               
                <li>
                {detalhes.genres && (
              <ul className="flex  ">
                {detalhes.genres.map((genre) => (
                  <li
                    className="pr-2"
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
                </li>
                <li className="capitalize">{releaseDate}</li>
              </ul>
            
          
             <span className="py-3 font-bold text-lg">{detalhes.tagline}</span>
              <div className=" flex gap-5  items-center ">
                <div className="size-12   ">
                <Circle por={formattedVoteAverage } />
                </div>
               <TvMinimalPlay className="size-12"/>
                </div>
            
            <p className="text-lg leading-8 tracking-wide py-5 flex-1 ">
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



          <div className="flex  gap-3 items-center justify-center w-5/12 m-auto py-2 ">
        <div className="flex flex-col gap-5">
          <h2 className="capitalize text-xl font-semibold">elenco principal</h2>
          <div className="flex gap-5">
            {elenco &&
            elenco.map((genre) => (
              <div
                className="text-ellipsis w-40 h-64 mb-5  shadow  shadow-zinc-700 rounded-lg overflow-hidden   "
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
      

    
    </div>
   
  );
};
ShowDetailsMovies.propTypes = {
  elenco: PropTypes.array.isRequired,
  diretor: PropTypes.object.isRequired,
  detalhes: PropTypes.array.isRequired,

};


export default ShowDetailsMovies;
