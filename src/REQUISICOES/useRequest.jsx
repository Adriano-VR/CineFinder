import { useEffect, useState } from "react";
import useFetch from "../HOOKS/useFetch.jsx";
import PropTypes from 'prop-types';

const useRequest = (endpoint,options) => {
  const { request, data, error, loading } = useFetch();   
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await request(endpoint, options); // Realiza a requisição e obtém a resposta
    };

    fetch();
  }, [request]); // Adiciona `request` ao array de dependências para evitar avisos do linter

  useEffect(() => {
    if (data) {
      setFetchedData(data);
    }
  }, [data]);

  return {
    data: fetchedData,
    error,
    loading,
  };

  
};

useRequest.propTypes = {
  endpoint:PropTypes.string.isRequired,
  options:PropTypes.string.isRequired,
};

export default useRequest;
