import ListaFilmesCategoria from './ListaFilmesCategoria.jsx';
import PropTypes from 'prop-types';
import {WhatsURL} from "../UTILS/utils.js";

const SectionMovies = ({ category }) => {
const {data} = WhatsURL(category)



  // if (loading) return <div>Carregando...</div>;
  // if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <section  className="linear flex items-center justify-center flex-col p-5 box-border ">
  
      {category === 'popular' && data && (
        <ListaFilmesCategoria arr={data} category="Popular"  />
      )}

      {category === 'nowplaying' && data && (
        <ListaFilmesCategoria arr={data} category="Now Playing"  />
      )}

      {category === 'toprated' && data && (
      <ListaFilmesCategoria arr={data} category="Top Rated"  />
      )}
    </section>
  );
};

SectionMovies.propTypes = {
  category: PropTypes.string.isRequired, // Garante que a categoria seja uma das opções válidas
};

export default SectionMovies;
