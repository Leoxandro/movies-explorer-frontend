import { filmsURL } from "../constants/constants";

const getMovies = async () => {
    const res = await fetch(`${filmsURL}/beatfilm-movies`);
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
  
    return data;
  }
  
  const MoviesApi = {
    getMovies
  };
  
  export default MoviesApi;
  