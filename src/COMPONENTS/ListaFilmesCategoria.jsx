import PropTypes from 'prop-types';
import { ReactComponent as ArrowRight } from '../SVG/arrow-right-sm-svgrepo-com.svg';
import { Link } from 'react-router-dom';


const ListaFilmesCategoria = ({arr,category}) => {
  
  return (
    <div className='flex flex-col gap-5  w-11/12 py-8 text-zinc-200'>
       <div className='flex justify-between'>
        <h1 className='font-semibold text-left text-2xl '>{category}</h1>
            <div className='flex items-center justify-center'>
            <Link to={`/see-all/${category.replace(/ /g, "-")}`}>
            <button className='text-xl'>See All</button>
              </Link>
            
            <ArrowRight />
            </div>
       </div>
                <div className='flex gap-4'>
                        {arr &&
                        arr.slice(0,8).map((item) => (
                    <div key={item.id} className='relative overflow-hidden rounded-lg'>
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
