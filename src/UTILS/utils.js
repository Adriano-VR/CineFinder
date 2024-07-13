import { useEffect, useState } from 'react';
import { GET_NOWPLAYING, GET_POPULAR,GET_TOP_RATED } from "../ENDPOINTS/api.js";
import useFetch from "../HOOKS/useFetch.jsx"

// Function to return the corresponding icon component based on typeName
export const WhatsURL = (category,page) => {
   
    const {request,loading} = useFetch();
    const [data, setData] = useState([]);
    const [infoPage,setInfoPage] = useState({})  
    const [cat,setCat] = useState("")  


    useEffect(() => {

        async function fetch() {
          let apiCall;

          if (category === "popular") {
            apiCall = GET_POPULAR(page);
          } else if (category === "nowplaying" || category==='now-playing') {
            apiCall = GET_NOWPLAYING(page);
          }else if(category === "toprated" || category === "top-rated"){
            apiCall = GET_TOP_RATED(page);
          }
      
          if (apiCall) {
            const { url , options } = apiCall;
            const { json } = await request(url, options);
            setData(json.results)
            setInfoPage(json)
            setCat(category)
          }
    
        }
       fetch()
      }, [category,page]);

   

      return {data,infoPage,loading,cat}
};
