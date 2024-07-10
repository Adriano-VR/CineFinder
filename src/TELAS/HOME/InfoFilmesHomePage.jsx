import PropTypes from "prop-types";
import {WhatsURL} from "../../UTILS/utils.js"
import { useEffect } from "react";
import GetTrailer from "../../UTILS/getTrailer.js"

const InfoFilmesHomePage = ({selectedMovie}) => {

  const getDetailsVideos = GetTrailer()
   
    const {getDetails, details} = WhatsURL('popular')

    useEffect(() => {
      getDetails(selectedMovie.id)
    },[getDetails, selectedMovie])



    const handleTrailer = async () => await getDetailsVideos(selectedMovie.id)
    
    const changeLanguage = () => {
    return localStorage.getItem("lang") === "pt-BR" ? "MAIS INFORMAÇÕES" : "MORE INFO"
  }


  return (
    <div className="absolute z-10 linear text-white h-full w-full flex justify-center flex-col"
    style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, .5), #0d0d0d)" }}>
       <div className="pl-20 w-7/12">
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
           
             
                  <button onClick={handleTrailer} className="bg-green-300 p-3 rounded font-bold text-[#0d0d0d]">
                  TRAILER
                  </button>
                  
             
               
              
              <button className="bg-orange-300 p-3 rounded font-bold text-[#0d0d0d]">
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
