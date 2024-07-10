  import { useParams } from "react-router-dom"
  import { useState,useEffect } from "react"
  import ListarLayout from "../../COMPONENTS/ListarLayout.jsx";
import Loader from "../../COMPONENTS/Loader.jsx";
import {WhatsURL} from "../../UTILS/utils.js";

  const FilmesCategoria = () => {
    const { category } = useParams();
    const [page, setPage] = useState(1);

    useEffect(() => {
    sessionStorage.setItem("page" , page)
    }, [])
    
   
  const {data,infoPage,loading} = WhatsURL((category.replace(/-/g, '').trim().toLowerCase()),page)

    if (loading) {
      return <Loader />;
    }
    

    return (
        <ListarLayout arr={data} category={category} page={page} total_pages={infoPage.total_pages} setPage={setPage} loading={loading} />
    
    ) 
  }


  export default FilmesCategoria
