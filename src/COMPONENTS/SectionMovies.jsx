import ListaFilmesCategoria from './ListaFilmesCategoria.jsx';
import PropTypes from 'prop-types';
import { GET_NOWPLAYING, GET_POPULAR,GET_TOP_RATED } from "../ENDPOINTS/api.js";
import useFetch from "../HOOKS/useFetch.jsx";
import { useEffect, useState } from 'react';

const SectionMovies = ({ category }) => {
  const {request} = useFetch();
  const [data, setData] = useState([]);


  useEffect(() => {

    async function fetch() {
      let apiCall;

      if (category === 'pop') {
        apiCall = GET_POPULAR();
      } else if (category === 'now') {
        apiCall = GET_NOWPLAYING();
      }else if(category === 'top'){
        apiCall = GET_TOP_RATED();
      }
  
      if (apiCall) {
        const { url , options } = apiCall;

        const { json } = await request(url, options);
        setData(json.results)
      }

    }
   fetch()
  }, [category, request]);

  // if (loading) return <div>Carregando...</div>;
  // if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <section  className="linear flex items-center justify-center flex-col p-5 box-border">
  
      {category === 'pop' && data && (
        <ListaFilmesCategoria arr={data} category="Popular" />
      )}

      {category === 'now' && data && (
        <ListaFilmesCategoria arr={data} category="Now Playing" />
      )}

      {category === 'top' && data && (
      <ListaFilmesCategoria arr={data} category="Top Rated" />
      )}
    </section>
  );
};

SectionMovies.propTypes = {
  category: PropTypes.exact(['pop', 'now']).isRequired, // Garante que a categoria seja uma das opções válidas
};

export default SectionMovies;
