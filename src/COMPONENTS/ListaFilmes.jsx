import PropTypes from 'prop-types';
import "../CSS/fonts.css"


const ListaFilmesCategoria = ({arr,category}) => {

  return (
    <div className='flex flex-col gap-5  w-11/12 py-8'>
         <h1 className='sora font-semibold text-left text-2xl'>{category}</h1>
                <div className='flex gap-4'>
                        {arr &&
                        arr.slice(0,8).map((item) => (
                    <div key={item.id} className='relative overflow-hidden rounded-lg border-green-600'>
                        <div className='transform hover:scale-110 hover transition duration-300 ease-in-out cursor-pointer  '>
                            <img 
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                            className='relative rounded'
                            alt="" 
                            />
                        </div>
                    </div>
                    

                    ))}
                    </div>
    </div>

  )
}


ListaFilmesCategoria.propTypes = {
  arr: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,

};

export default ListaFilmesCategoria
