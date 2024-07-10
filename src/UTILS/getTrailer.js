import { GET_DETAILS_MOVIE_TRAILER } from "../ENDPOINTS/api";
import useFetch from "../HOOKS/useFetch";



const GetTrailerMovie = () => {
    const {request} = useFetch()


    async function getDetailsVideos(id) {
        const { url, options } =  GET_DETAILS_MOVIE_TRAILER(id);
        const {json} = await request(url, options); 
            const trailerFilme =  getOficialTrailer(json.results)
          
            if (trailerFilme) {
                open(trailerFilme)
            }else{
                alert("Nao Ha Trailer Disponivel")
            }
     }

     const getOficialTrailer = (video) => {
        if (video && Array.isArray(video) && video.length > 0) {
            const officialTrailer = video.find(
                video => video.name.includes('Trailer') || video.name.includes('trailer')
            );
                return `https://www.youtube.com/watch?v=${officialTrailer.key}`;
        }
     }

    const open = (videoUrl) =>  window.open(videoUrl, '_blank');   
    


  return getDetailsVideos
}

export default GetTrailerMovie
