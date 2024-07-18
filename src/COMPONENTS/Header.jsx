import  { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GET_ACCOUNT_DETAILS, GET_REQUEST_TOKEN } from '../ENDPOINTS/api';
import useFetch from '../HOOKS/useFetch';
import {CircleUserRound,CircleChevronDown,X,DoorOpen} from "lucide-react"

const Header = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "pt-BR");
  const { request } = useFetch();
  const [accountDetails, setAccountDetails] = useState({});
  const [requestToken, setRequestToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const [modal, setModal] = useState(false);

  useEffect(() => {
      if(!isAuthenticated)  getRequestToken(); 
   
  }, []);

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    if (session_id) {
      setIsAuthenticated(true);
      fetchAccountDetails(session_id);
    }
  }, [requestToken]);

  useEffect(() => {
    sessionStorage.setItem("pathname", location.pathname);
  }, [location.pathname]);

  const fetchAccountDetails = async (session_id) => {
    if (session_id) {
      const { url, options } = GET_ACCOUNT_DETAILS(session_id);
      const { json, error } = await request(url, options);
      if (json) {
        setAccountDetails(json);
      } else {
        console.error('Falha ao buscar detalhes da conta', error);
      }
    }
  };

  const getRequestToken = async () => {
    const { url, options } = GET_REQUEST_TOKEN();
    const { json, error } = await request(url, options);
    if (json) {
      setRequestToken(json.request_token);
      return json.request_token;
    } else {
      console.error('Falha ao obter token de request', error);
      return null;
    }
  };

  const handleLanguageChange = ({ target }) => {
    const newLang = target.value;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    window.location.reload();
  };

  const handleLogin = async () => {
    if (!requestToken) {
      console.error('Token de request não está disponível');
      return;
    }
    //  const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/authenticate`;
    const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://movies-tmdb-orpin.vercel.app/authenticate`;

    window.location.href = redirectUrl;
  };

  const handleLogout = () => {
    setModal(false)
    localStorage.removeItem('session_id');
    setIsAuthenticated(false);
    setAccountDetails({});
    window.location.reload();
  };

  const changeLanguage = (category) => {
    if (category === "filmes") return lang === "pt-BR" ? "Filmes" : "Movies";
    else if (category === "series") return lang === "pt-BR" ? "Séries" : "TV Series";
  };

  const [selectedCategory, setSelectedCategory] = useState(sessionStorage.getItem("selectedCategory") || "filmes");
  useEffect(() => {
    sessionStorage.setItem("selectedCategory", selectedCategory);
    
  },[])

  const handleCategoryClick = (category) => {
    sessionStorage.setItem("selectedCategory", category);
    setSelectedCategory(category)
  };


const nav = useNavigate()
  const handleLogoClick = () => {
    sessionStorage.setItem("selectedCategory", 'filmes');
    setSelectedCategory('filmes');

    nav('/filmes')
  };
const type = 'tv'
const cat =  'OnTheAir'

const urlPath = `${type}/${cat}`;
console.log(urlPath);

  return (
    <div className='flex sm:justify-center justify-between items-center h-[7vh]  bg-[hsla(0,0%,8%,.9)] text-[#FAA307]'>
      <div className="w-11/12 flex justify-between items-center m-auto">
        <div className="flex gap-28 items-center">
          <div className='hover:scale-110 duration-300 cursor-pointer' onClick={handleLogoClick}>
              <h1 className=' text-2xl tracking-widest  font-bold font-racing'>CINEFINDER</h1>
          </div>
          <nav>
            <ul className="hidden  md:flex gap-3 cursor-pointer text-base h-7 border-[#FAA307]">
              <li 
                className={selectedCategory === 'filmes' ? 'font-extrabold border-b border-inherit' : null}
              >
                <Link to="/filmes" onClick={() => handleCategoryClick('filmes')}>
                  {changeLanguage('filmes')}
                </Link>
              </li>
              <li 
              className={selectedCategory === 'series' ? 'font-extrabold border-b border-inherit' : null}
              >


                <Link to={`${urlPath}`} onClick={() => handleCategoryClick('series')}>
                  {changeLanguage('series')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='hidden md:flex items-center text-base gap-5 ' >
              <select value={lang}  onChange={handleLanguageChange} className=" select select-ghost  max-w-xs  ">
              <option value="en-US">US</option>
              <option value="pt-BR">BR</option>
             
              </select>
          <div className='w-[10vw]'>
              {isAuthenticated ? (
                <div className='flex gap-2 items-center '>
                <h1 className=''>Oi , {accountDetails.username}</h1>
                <CircleChevronDown className='size-5 cursor-pointer' onClick={() => setModal(true)} />
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                <button onClick={handleLogin} className="btn btn-ghost ">
                <CircleUserRound />
                  Login
                </button>
                </div>
               
              )}
          </div>
        </div>
      </div>
          {modal && (
            <div className='fixed inset-0 h-screen z-50 flex items-start justify-center bg-black/60  '>
                  <div className='w-4/12 mt-10 flex flex-col bg-black p-5 gap-2 rounded-md'>
                  <div className='flex items-center justify-center w-full'>
                    <h1 className='flex-1'>Welcome, {accountDetails.username}</h1>
                    <X onClick={() => setModal(false)} />
                  
                  </div>
                  <p>ID : {accountDetails.id}</p> 
                  <p>Nome : {accountDetails.name}</p> 
                  <p>Pais : {accountDetails.iso_3166_1}</p> 
                        <div className='flex justify-center gap-2 w-full cursor-pointer'>
                        <DoorOpen className='size-5'/>
                        <strong onClick={handleLogout}>Logout</strong>
                        </div>
                
                </div>

                 
            </div>
          )}
    
    </div>
  );
};

export default Header;
