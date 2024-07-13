import useFetch from "../HOOKS/useFetch";
import { GET_SERIES_VIDEOS } from "../ENDPOINTS/api";

const GetSeriesVideo = () => {
    const {request} = useFetch()


    async function getSeriesVideos(id) {
        const { url, options } =  GET_SERIES_VIDEOS(id);
        const {json} = await request(url, options);
        const trailerUrl = getOfficialTrailer(json.results);
        if(trailerUrl) {
        open(trailerUrl)
        } else {
            alert("Nao ha Videos")
        }
      
     }

     const getOfficialTrailer = (video) => {
        if (video && Array.isArray(video) && video.length > 0) {
            const officialTrailer = video.find(
                video => video.site.includes('YouTube') 
            );

            return officialTrailer ? `https://www.youtube.com/watch?v=${officialTrailer.key}` : null;
        }
     }

        const open = (video) => {
            window.open(video , "_blank");
        }


  return getSeriesVideos

}

export default GetSeriesVideo


