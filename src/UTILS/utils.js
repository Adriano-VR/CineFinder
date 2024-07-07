import { useEffect, useState } from 'react';
import { GET_DETAILS_MOVIE, GET_NOWPLAYING, GET_POPULAR,GET_TOP_RATED } from "../ENDPOINTS/api.js";
import useFetch from "../HOOKS/useFetch.jsx"

// Function to return the corresponding icon component based on typeName
export const WhatsURL = (category,page) => {
   
    const {request,loading} = useFetch();
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([{}])
    const [infoPage,setInfoPage] = useState({})  

    useEffect(() => {

        async function fetch() {
          let apiCall;

         
          if (category === "popular") {
            console.log("entrei popular");
            apiCall = GET_POPULAR(page);
          } else if (category === "nowplaying") {
            console.log("entrei now_playing");
            apiCall = GET_NOWPLAYING(page);
          }else if(category === "toprated"){
            console.log("entrei top");
            apiCall = GET_TOP_RATED(page);
          }
      
          if (apiCall) {
            const { url , options } = apiCall;
              console.log("url daa" , url);
            const { json } = await request(url, options);
            setData(json.results)
            setInfoPage(json)
          }
    
        }
       fetch()
      }, [category,page]);

      async function getDetails(id) {
        
        const { url, options } =  GET_DETAILS_MOVIE(id); // Obtém a URL e opções para a requisição GET
         const {json} = await request(url, options); // Faz a requisição e obtém a resposta
        setDetails(json)
      
     }
 

      return {data,infoPage,loading,getDetails,details}
};
