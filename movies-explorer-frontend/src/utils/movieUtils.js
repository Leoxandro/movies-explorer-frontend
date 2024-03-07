export function filterMovies(movies, searchTerm, isShort) {
    if (!Array.isArray(movies)) {
      return [];
    }
  
    return movies.filter((movie) =>
      movie.nameRU && movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase()) && (isShort ? movie.duration <= 40 : true)
    );
  }