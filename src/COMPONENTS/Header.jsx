


const Header = () => {
  return (
    <div className=" absolute top-0 z-50 w-full">
    <div className=' p-4 grid grid-cols-3 justify-items-center border-b border-orange-500 w-full bg-[#0d0d0d] text-orange-300'>
       <h1>logo</h1>
       <nav className="">
        <ul className="flex  gap-3">
          <li>Fimes</li>
          <li>Series</li>
        </ul>
       </nav>
       <strong>Lang</strong>
       
    </div>
    </div>
  )
}

export default Header
