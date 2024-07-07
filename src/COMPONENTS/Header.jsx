 import { Link } from 'react-router-dom';
import Logo from '../SVG/logo';



const Header = () => {
  return (
   
    <div className='flex justify-between items-center h-[7vh]  sticky top-0 z-50 bg-[hsla(0,0%,8%,.9)] text-[#FAA307]'>
        <div className="w-11/12 flex justify-between items-center m-auto">

       
        <div className="flex gap-28 items-center" >
          <Link to="/" className='hover:scale-110 duration-300'>
          <Logo color="#E85D04" />
          </Link>
          
            <nav className="">
            <ul className="flex  gap-3">
              <li>Fimes</li>
              <li>Series</li>
            </ul>
          </nav>
        </div>
       
       <strong>Lang</strong>
       
       </div>
    </div>
  )
}

export default Header
//https://coolors.co/palette/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08