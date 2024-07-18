import { useLocation } from "react-router-dom";
import ShowDetailsMovies from "./ShowDetailsMovies";
import Loader from "../../COMPONENTS/Loader";
import useGetMovieInformation from "../../HOOKS/useGetMovieInformation";
import { useEffect } from "react";
const PageDetails = () => {
  const { state } = useLocation();

  const filme = state && state.key;

  // const [detailsSeries, setDetailsSeries] = useState([{}])

  const { getDetails, movieDetails, diretorActor, loading } = useGetMovieInformation()

  async function fetch () {
    await getDetails({id: filme.id})
  }

  const { diretor, elenco } = diretorActor;
  

  const isMovie = sessionStorage.getItem("selectedCategory") === "filmes";

  
  useEffect(() => {
    fetch()
  },[])



  if (loading ) return <Loader />;

  return (
    <>
      {isMovie && (
        <ShowDetailsMovies
          diretor={diretor}
          elenco={elenco}
          detalhes={movieDetails}
        />
      )}
    </>
  );
};

export default PageDetails;
