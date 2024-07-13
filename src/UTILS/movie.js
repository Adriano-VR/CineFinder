import { useEffect, useState } from "react";
import { GET_CREDITS_MOVIE, GET_DETAILS_MOVIE, GET_DETAILS_SERIE } from "../ENDPOINTS/api.js";

import useFetch from "../HOOKS/useFetch.jsx"
 
 const useGetInformation = ({id,tipo}) => {

  const {request,loading} = useFetch();
  const [diretorActor, setDiretorActor] = useState({ elenco: [{}], diretor: {} });
  const [detailsFilmes, setDetailsFilmes] = useState([{}])


  async function getDetails() {
    if(tipo === 'filmes'){
      const { url, options } =  GET_DETAILS_MOVIE(id);
      const {json} = await request(url, options); 
      setDetailsFilmes(json)
      getCreditsMovie()
    }else if(tipo === 'series'){
      const { url, options } = GET_DETAILS_SERIE(id);
      const {json} = await request(url, options); 
     return json
    }
   
  return null
  }
  
  
  async function getCreditsMovie() {
  const { url, options } = GET_CREDITS_MOVIE(id)
  const {json} = await request(url, options); 
  const {cast,crew} = json
  if(json) {
    setDiretorActor({
      elenco: cast.slice(0, 8).filter(ac => ac.known_for_department.includes('Acting')),
      diretor: crew.find(ac => ac.known_for_department.includes('Directing'))
    });
  }
  
  }
        useEffect(()=>{
         getDetails()
        },[id])

        return {detailsFilmes,diretorActor,loading}
 }



export default useGetInformation

