const API_URL = 'https://api.themoviedb.org';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA5MTg5MDNiYTVjNDAyNjZhMmE0M2Y4ZTFmNWZjMiIsIm5iZiI6MTcyMDA2MzM1NC4yOTUxMzQsInN1YiI6IjY2ODUxMmU3NzFhYzMzZjJlNTE3Y2FlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5u-xwYg4uNNcczl5Q4YBFotrOoo-bdIum22tw9rjz0I'
const lang = "pt-BR";


export function GET_NOWPLAYING(page) {
  const numberPage = page || 1;

  return {
    url: API_URL + '/3/movie/now_playing?page=' + numberPage+ '&language=' + lang,
    options: {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
    },
  };
}

export function GET_TOP_RATED(page) {
  const numberPage = page || 1;
  return {
    url: API_URL + '/3/movie/top_rated?page=' + numberPage + '&language=' + lang,
    options: {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
    },
  };
}

export function GET_POPULAR(page) {
  const numberPage = page || 1;
    return {
      url: API_URL + '/3/movie/popular?page=' + numberPage + '&language=' + lang,
      options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TOKEN
          }
      },
    };
  }



export function GET_DETAILS_MOVIE(movieID) {
    return {
      url: API_URL + '/3/movie/' + movieID +'?language=' + lang,
      options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TOKEN
          }
      },
    };
  }