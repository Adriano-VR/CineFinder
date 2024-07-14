import { useEffect, useState } from "react";
import { GET_SERIES_ONTHEAIR } from "../../ENDPOINTS/api.js";
import useFetch from "../../HOOKS/useFetch.js";
import ListarLayout from "../../COMPONENTS/ListarLayout.jsx";
import { useParams } from "react-router-dom";


const TVSeries = () => {
  const { request } = useFetch();
  const [data, setData] = useState([{}]);
  const [total_pages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (page) => {
    const { url, options } = GET_SERIES_ONTHEAIR(page);
    const { json } = await request(url, options); 
    setData(json.results);
    setTotalPages(json.total_pages);
  };
  

  useEffect(() => {
    fetchData(page);
   
  }, [page, request]); 

const {category} = useParams()



  return (
    <div>
      {data && data.length > 0 && (
        <ListarLayout arr={data} category={category} total_pages={total_pages} setPage={setPage} />
      )}
    </div>
  );
};

export default TVSeries;
