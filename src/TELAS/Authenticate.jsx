import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom'; // Adicionado useNavigate para redirecionamento
import { CREATE_SESSION } from "../ENDPOINTS/api"; // Assumindo que você tem um endpoint para obter informações do usuário
import useFetch from "../HOOKS/useFetch";
import {ReactComponent as Check} from "../SVG/check-circle-svgrepo-com.svg";
import {ReactComponent as Alert} from "../SVG/alert-square-svgrepo-com.svg";


const Authenticate = () => {
  const { request } = useFetch();
  const navigate = useNavigate(); // Hook para redirecionamento
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let requestToken = queryParams.get('request_token');
      userPermission(requestToken);
    
  }, []);






  const userPermission = async (token) => {
    try {
      const { url, options } = CREATE_SESSION(token);
      const { response, json } = await request(url, options);

      if (!response) {
        throw new Error("No response from server");
      }

  

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      if (!json) {
        throw new Error("Response JSON is null");
      }

      if (!json.session_id) {
        throw new Error("Session ID not found in response");
      }

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
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        navigate('/filmes');
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);



  return (
    <div className='text-zinc-200 h-[93vh] flex items-center   justify-center'>
      
      {isAuthenticated  ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Check />
          <h1>Autenticação concluída com sucesso!</h1>
          <p>Redirecionando para a página inicial em 3 segundos...</p>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Alert />
          <h1>Autenticação falhou</h1>
          {error && <p className="text-red-500">{error}</p>}
           <p>Redirecionando para a página inicial em 3 segundos...</p>
        </div>
      )}
    </div>
  );
};

export default Authenticate;
