import PropTypes from "prop-types";
import {WhatsURL} from "../UTILS/utils"
import { useEffect, useState } from "react";
const InfoFilmesHomePage = ({selectedMovie}) => {

    const {getDetailsVideos,video} = WhatsURL()
    const [videoUrl, setVideoUrl] = useState(null)

    const {getDetails, details} = WhatsURL('popular')

    useEffect(() => {
      getDetails(selectedMovie.id)
      getDetailsVideos(selectedMovie.id) 
    },[selectedMovie])


    const handleTrailer = () => {
     

      if ( video && Array.isArray(video) && video.length > 0) {
        const officialTrailer = video.find(
          video => video.name.includes('Trailer') || video.name.includes("trailer")
        ); 
      
        if (officialTrailer) {
          setVideoUrl(`https://www.youtube.com/watch?v=${officialTrailer.key}`);
        }
      }
    }

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
           
              {video ? (
              <button onClick={handleTrailer} className="bg-green-300 p-3 rounded font-bold text-[#0d0d0d]">
                  <a href={videoUrl} target="_blank">
                            TRAILER
                            </a>
                          </button>
               ) : (
                    <button className="bg-red-700 p-3 rounded font-bold text-[#0d0d0d]">
                    NO TRAILER
                    </button>
               )
             
               } 
              
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
