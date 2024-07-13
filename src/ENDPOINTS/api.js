
const API_URL = 'https://api.themoviedb.org';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzA5MTg5MDNiYTVjNDAyNjZhMmE0M2Y4ZTFmNWZjMiIsIm5iZiI6MTcyMDA2MzM1NC4yOTUxMzQsInN1YiI6IjY2ODUxMmU3NzFhYzMzZjJlNTE3Y2FlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5u-xwYg4uNNcczl5Q4YBFotrOoo-bdIum22tw9rjz0I'
const lang = localStorage.getItem("lang"); 




export function GET_SERIES_VIDEOS(seriesId) {
  return {
    url:`${API_URL}/3/tv/${seriesId}/videos?language=${lang}`,
    options: {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
    },
  };
}


export function GET_SERIES_ONTHEAIR(page) {
  const numberPage = page || 1;

  return {
    url: API_URL + '/3/tv/on_the_air?page=' + numberPage+ '&language=' + lang,
    options: {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
    },
  };
}

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


export function GET_CREDITS_MOVIE(movieID) {
    return {
      url: API_URL + '/3/movie/' + movieID + '/credits' + '?language=' + lang,
      options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TOKEN
          }
      },
    };
  }

  
export function GET_DETAILS_SERIE(serieID) {
  return {
    url: API_URL + '/3/tv/' + serieID +'?language=' + lang,
    options: {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TOKEN
        }
    },
  };
}


  export function GET_DETAILS_MOVIE_TRAILER(movieID) {
    return {
      url: API_URL + '/3/movie/' + movieID + '/videos',
      options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + TOKEN
          }
      },
    };
  }


  export function GET_REQUEST_TOKEN() {
    return {
      url: `${API_URL}/3/authentication/token/new`,
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TOKEN}` // Cabeçalho de autorização com o prefixo Bearer
        },
      },
    };
  }
  
  // Função para criar uma nova sessão com o token de solicitação
  export function CREATE_SESSION(requestToken) {
    return {
      url: `${API_URL}/3/authentication/session/new`,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}` // Cabeçalho de autorização com o prefixo Bearer
        },
        body: JSON.stringify({ request_token: requestToken }),
      },
    };
  }

  export function GET_ACCOUNT_DETAILS(sessionId) {
    return {
      url: `https://api.themoviedb.org/3/account/${sessionId}`,
      options: {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    };
  }
  
