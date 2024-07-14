import { useCallback } from "react";
import { GET_DETAILS_SERIE, GET_SERIES_VIDEOS } from "../ENDPOINTS/api";
import useFetch from "./useFetch";

const useGetSeriesInformation = () => {
  const { request, loading } = useFetch();

  const getDetails = useCallback(async (id) => {
    if (!id) {
      console.warn("ID inválido fornecido para getDetails");
      return;
    }

    const { url, options } = GET_DETAILS_SERIE(id);
    const { json } = await request(url, options);
    return json;
  }, [request]);

  const getSeriesVideos = useCallback(async (id) => {
    const { url, options } = GET_SERIES_VIDEOS(id);
    const { json } = await request(url, options);
    const trailerUrl = getSerieTrailer(json.results);
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    } else {
      alert("Não há vídeos");
    }
  }, [request]);

  const getSerieTrailer = useCallback((videos) => {
    if (videos && Array.isArray(videos) && videos.length > 0) {
      const officialTrailer = videos.find(
        video => video.site.includes('YouTube')
      );

      return officialTrailer ? `https://www.youtube.com/watch?v=${officialTrailer.key}` : null;
    }
    return null;
  }, []);

  return { loading, getDetails, getSeriesVideos };
};

export default useGetSeriesInformation;
