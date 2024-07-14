import { useLocation } from "react-router-dom";
import ShowDetailsMovies from "./ShowDetailsMovies";
import Loader from "../../COMPONENTS/Loader";
import useGetMovieInformation from "../../HOOKS/useGetMovieInformation";
import { useEffect, useState } from "react";
const PageDetails = () => {
  const { state } = useLocation();
  const [data,setData] = useState([{}]);

  const filme = state && state.key;

  // const [detailsSeries, setDetailsSeries] = useState([{}])

  const { getDetails, diretorActor, loading } = useGetMovieInformation()

  async function fetch () {
    setData(await getDetails({id: filme.id, tipo: "filmes"}));
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
          detalhes={data}
        />
      )}
    </>
  );
};

export default PageDetails;
