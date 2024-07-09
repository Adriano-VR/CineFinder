import  { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../SVG/logo';
import { GET_ACCOUNT_DETAILS, GET_REQUEST_TOKEN } from '../ENDPOINTS/api';
import useFetch from '../HOOKS/useFetch';

const Header = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "pt-BR");
  const { request } = useFetch();
  const [accountDetails, setAccountDetails] = useState({});
  const [requestToken, setRequestToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchAccountDetails();
 
    getRequestToken(); 
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
    const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/authenticate`;
    window.location.href = redirectUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('session_id');
    setIsAuthenticated(false);
    setAccountDetails({});
    window.location.reload();
  };

  const changeLanguage = (category) => {
    if (category === "filmes") return lang === "pt-BR" ? "Filmes" : "Movies";
    else if (category === "series") return lang === "pt-BR" ? "Séries" : "TV Series";
  };

  const handleCategoryClick = (category) => {
    sessionStorage.setItem("selectedCategory", category);
  };

  const selectedCategory = sessionStorage.getItem("selectedCategory") || 'filmes';
const nav = useNavigate()
  const handleLogoClick = () => {
    sessionStorage.setItem("selectedCategory", 'filmes');
    nav('/filmes')
  };

  return (
    <div className='flex justify-between items-center h-[7vh] sticky top-0 z-50 bg-[hsla(0,0%,8%,.9)] text-[#FAA307]'>
      <div className="w-11/12 flex justify-between items-center m-auto">
        <div className="flex gap-28 items-center">
          <div className='hover:scale-110 duration-300 cursor-pointer' onClick={handleLogoClick}>
            <Logo color="#E85D04" />
          </div>
          <nav>
            <ul className="flex gap-3 cursor-pointer h-7 border-[#FAA307]">
              <li 
                className={selectedCategory === 'filmes' ? 'font-extrabold border-b border-inherit' : ''}
              >
                <Link to="/filmes" onClick={() => handleCategoryClick('filmes')}>
                  {changeLanguage('filmes')}
                </Link>
              </li>
              <li 
                className={selectedCategory === 'series' ? 'font-extrabold border-b border-inherit' : ''}
              >
                <Link to="/series" onClick={() => handleCategoryClick('series')}>
                  {changeLanguage('series')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='flex gap-10 items-center'>
          <select className='relative flex bg-transparent' value={lang} onChange={handleLanguageChange}>
            <option value="en-US">en-US</option>
            <option value="pt-BR">PT-BR</option>
          </select>
          {isAuthenticated ? (
            <h1 onClick={handleLogout} className='cursor-pointer'>Logout</h1>
          ) : (
            <button onClick={handleLogin}>
              Entrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
