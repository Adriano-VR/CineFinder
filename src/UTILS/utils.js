import { useEffect, useState } from 'react';
import { GET_NOWPLAYING, GET_POPULAR,GET_TOP_RATED } from "../ENDPOINTS/api.js";
import useFetch from "../HOOKS/useFetch.jsx"

// Function to return the corresponding icon component based on typeName
export const WhatsURL = (category) => {
   
    const {request,loading} = useFetch();
    const [data, setData] = useState([]);
    const [infoPage,setInfoPage] = useState({})  

    useEffect(() => {

        async function fetch() {
          let apiCall;

         
          if (category === "popular") {
            console.log("entrei popular");
            apiCall = GET_POPULAR();
          } else if (category === "nowplaying") {
            console.log("entrei now_playing");
            apiCall = GET_NOWPLAYING();
          }else if(category === "toprated"){
            console.log("entrei top");
            apiCall = GET_TOP_RATED();
          }
      
          if (apiCall) {
            const { url , options } = apiCall;
              console.log("url " , url);
            const { json } = await request(url, options);
            setData(json.results)
            setInfoPage(json)
          }
    
        }
       fetch()
      }, [category, request]);
 

      return {data,infoPage,loading}
};
