  import { useParams } from "react-router-dom"
  import useFetch from "../HOOKS/useFetch.jsx"
  import { useEffect, useState } from "react"
  import { GET_NOWPLAYING, GET_POPULAR,GET_TOP_RATED } from "../ENDPOINTS/api.js";
  import ListarSeeAll from "../COMPONENTS/ListarSeeAll.jsx";
import Loader from "../COMPONENTS/Loader.jsx";

  const PageSeeAll = () => {
    const {request,loading  } = useFetch()
    const [data,setData] = useState([])
    const { category } = useParams();
    const [page, setPage] = useState(1);
    const [infoPage,setInfoPage] = useState(1)  


    //depois tentar criar uma funcao para idsso
    useEffect(() => {

      async function fetch() {
        let apiCall;

        if (category === 'Popular') {
          apiCall = GET_POPULAR(page);
        } else if (category === 'Now-Playing') {
          apiCall = GET_NOWPLAYING(page);
        }else if(category === 'Top-Rated'){
          apiCall = GET_TOP_RATED(page);
        }
    
        if (apiCall) {
          const { url, options } = apiCall;
          const { json } = await request(url, options);
          setData(json.results)
          setInfoPage(json)
        }

      }
    fetch()
    }, [category,page]);

    if (loading) {
      return <Loader />;
    }
    

    return (
      <div className="text-white">
        <ListarSeeAll arr={data} category={category} page={page} infopage={infoPage.total_pages} setPage={setPage} loading={loading} />
      </div>
    ) 
  }


  export default PageSeeAll
