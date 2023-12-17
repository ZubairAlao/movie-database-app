export async function fetchMediaData(type, timePeriod, order) {
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUwZTliMDBmYzZiMDg0MTBjMGEzM2ZmMTJmODhiMyIsInN1YiI6IjY1NDBhMDlhNTc1MzBlMDEyY2Y0OGIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W0caIgTARRX3cQHWVVn9EnSMKGGwGQvtH7I8FWeT5G0';
  const baseUrl = 'https://api.themoviedb.org/3';

  const mediaTypes = {
    popularMovies: '/movie/popular',
    trendingMovies: `/trending/all/${timePeriod}`,
    topRatedMovies: `/movie/top_rated`,
    popularTvs: `/tv/popular`,
    topRatedTvs: `/tv/top_rated?sort_by=vote_average.${order}`,
    popularPeople: '/person/popular',
  };

  if (mediaTypes[type]) {
    const apiUrl = `${baseUrl}${mediaTypes[type]}?language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw {
          message: "Failed to fetch media data",
          statusText: response.statusText,
          status: response.status,
        };
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Invalid media type specified');
  }
}


export async function fetchMedia(type, id) {
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUwZTliMDBmYzZiMDg0MTBjMGEzM2ZmMTJmODhiMyIsInN1YiI6IjY1NDBhMDlhNTc1MzBlMDEyY2Y0OGIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W0caIgTARRX3cQHWVVn9EnSMKGGwGQvtH7I8FWeT5G0';
  const baseUrl = 'https://api.themoviedb.org/3';

  const mediaTypes = {
    movie: '/movie',
    tv: `/tv`,
    person: `/person`
  };

  if (mediaTypes[type]) {
    const apiUrl = `${baseUrl}${mediaTypes[type]}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw {
          message: "Failed to fetch media data",
          statusText: response.statusText,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Invalid media type specified');
  }
}

export async function fetchSearchedMedia(searchedQuery) {
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzUwZTliMDBmYzZiMDg0MTBjMGEzM2ZmMTJmODhiMyIsInN1YiI6IjY1NDBhMDlhNTc1MzBlMDEyY2Y0OGIwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W0caIgTARRX3cQHWVVn9EnSMKGGwGQvtH7I8FWeT5G0';
  const baseUrl = 'https://api.themoviedb.org/3';

  const apiUrl = `${baseUrl}/search/multi?query=${searchedQuery}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        throw {
          message: "Failed to fetch media data",
          statusText: response.statusText,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
}


// login
export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}