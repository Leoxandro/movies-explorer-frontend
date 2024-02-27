export const getId = (id, array) => {
    const searchItem = array.find((movie) => movie.movieId === id);
    return searchItem._id;
  };