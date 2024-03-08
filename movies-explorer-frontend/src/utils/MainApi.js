import { apiURL, filmsURL } from "../constants/constants";

const createRequest = async (url, method, body = null, token = null) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    };
  
    if (token) options.headers['Authorization'] = `Bearer ${token}`;
    if (body) options.body = JSON.stringify(body);
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message);
    }
  
    return data;
  }
  
  const getUser = (token) => createRequest(`${apiURL}/users/me`, 'GET', null, token);
  
  const updateUser = (user) => createRequest(`${apiURL}/users/me`, 'PATCH', {
    name: user.name,
    email: user.email
  });
  
  const getMovies = () => createRequest(`${apiURL}/movies`, 'GET');
  
  const addMovie = (movie) => createRequest(`${apiURL}/movies`, 'POST', {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `${filmsURL}/${movie.image.url}`,
    trailerLink: movie.trailerLink,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    thumbnail: `${filmsURL}/${movie.image.formats.thumbnail.url}`,
    movieId: movie.id
  });
  
  const deleteMovie = (id) => createRequest(`${apiURL}/movies/${id}`, 'DELETE');
  
  const MainApi = {
    getUser,
    updateUser,
    getMovies,
    addMovie,
    deleteMovie
  };
  
  export default MainApi;