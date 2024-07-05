import ListaFilmes from './ListaFilmes.jsx';
import PropTypes from 'prop-types';
import { GET_NOWPLAYING, GET_POPULAR } from "../ENDPOINTS/api.js";
import useRequest from "../REQUISICOES/useRequest.jsx";

const SectionMovies = ({ category }) => {
  let url, options;

  if (category === 'pop') {
    ({ url, options } = GET_POPULAR());
  } else if (category === 'now') {
    ({ url, options } = GET_NOWPLAYING());
  }

  const { data, error, loading } = useRequest(url, options);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <section className="bg-transparent flex items-center justify-center flex-col p-5 box-border">
  
      {category === 'pop' && data?.results && (
        <ListaFilmes arr={data.results} category="Popular" />
      )}
      {category === 'now' && data?.results && (
        <ListaFilmes arr={data.results} category="Now Playing" />
      )}
    </section>
  );
};

SectionMovies.propTypes = {
  category: PropTypes.oneOf(['pop', 'now']).isRequired, // Garante que a categoria seja uma das opções válidas
};

export default SectionMovies;
