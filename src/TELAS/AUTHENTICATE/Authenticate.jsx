import { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom'; // Adicionado useNavigate para redirecionamento
import { CREATE_SESSION } from "../../ENDPOINTS/api"; // Assumindo que você tem um endpoint para obter informações do usuário
import useFetch from "../../HOOKS/useFetch";
import {ShieldCheck,ShieldX} from "lucide-react";
import Loader from '../../COMPONENTS/Loader';

const Authenticate = () => {
  const { request,loading } = useFetch();
  const navigate = useNavigate(); // Hook para redirecionamento
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    let requestToken = queryParams.get('request_token');
    
    if (requestToken) {
      userPermission(requestToken);
    }
  }, [location.search]);






  const userPermission = async (token) => {
    try {
      const { url, options } = CREATE_SESSION(token);
      const {  json } = await request(url, options);

   
      localStorage.setItem('session_id', json.session_id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error in userPermission:", error);
      setError(`Error creating session: ${error.message}`);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
      
         navigate('/filmes');
         window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        navigate('/filmes');
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);


  if(loading) return <Loader />


  return (
    <div className='text-zinc-200 h-screen flex items-center   justify-center'>
      
      {isAuthenticated  ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <ShieldCheck className='size-44 text-green-400'  />
          <p>Redirecionando para a página inicial em 3 segundos...</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-2'>
          <ShieldX className='size-44 text-red-600'/>
           <p>Redirecionando para a página inicial em 3 segundos...</p>
        </div>
      )}
    </div>
  );
};

export default Authenticate;
