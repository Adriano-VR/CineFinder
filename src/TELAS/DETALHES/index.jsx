import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowDetailsMovies from "./ShowDetailsMovies";
import Loader from "../../COMPONENTS/Loader";
import useGetInformation from "../../UTILS/movie.js";
const PageDetails = () => {
  const { state } = useLocation();

  const filme = state && state.key;

  // const [detailsSeries, setDetailsSeries] = useState([{}])

  const { detailsFilmes, diretorActor, loading } = useGetInformation({
    id: filme.id,
    tipo: "filmes",
  });

  const { diretor, elenco } = diretorActor;

  const isMovie = sessionStorage.getItem("selectedCategory") === "filmes";

  if (loading) return <Loader />;

  return (
    <>
      {isMovie && (
        <ShowDetailsMovies
          diretor={diretor}
          elenco={elenco}
          detalhes={detailsFilmes}
        />
      )}
    </>
  );
};

export default PageDetails;
