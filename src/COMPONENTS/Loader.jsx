import { ReactComponent as Loadericon } from '../SVG/loading-svgrepo-com.svg';

const Loader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className='animate-spin'>
        <Loadericon />
        </div>
  </div>
  )
}

export default Loader
