import React, { useContext, useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SavedMoviesContext } from "../../providers/SavedMoviesProvider";
import Preloader from "../Preloader/Preloader";
import MoviesApi from "../../utils/MoviesApi";
import { filterMovies } from "../../utils/movieUtils";
import { CurrentUserContext } from "../../providers/CurrentUserContext";

function Movies() {
  const { savedMovies, saveMovie, removeMovie } =
    useContext(SavedMoviesContext);
  const { user } = useContext(CurrentUserContext);

  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    const savedCheckbox = JSON.parse(localStorage.getItem('isChecked'));
  
    if (savedSearch || savedCheckbox) {
      setSearchTerm(savedSearch);
      setIsChecked(savedCheckbox);
      fetchMovies(savedSearch, savedCheckbox);
    }
  }, [user]); //eslint-disable-line

  useEffect(() => {
    if (user) {
      const fetchInitialMovies = async () => {
        setIsLoading(true);
        setRequestError(null);

        try {
          let data;
          const initialMovies = JSON.parse(localStorage.getItem('movies'));

          if (!initialMovies) {
            data = await MoviesApi.getMovies();
            localStorage.setItem('movies', JSON.stringify(data));
          } else {
            data = initialMovies;
          }

          const filteredMovies = filterMovies(data, searchTerm, isChecked);
          setFetchedMovies(filteredMovies);
          localStorage.setItem('searchTerm', searchTerm);
          localStorage.setItem('isChecked', JSON.stringify(isChecked));
          setHasSearched(true);
        } catch (error) {
          setRequestError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchInitialMovies();
    }
  }, [user, searchTerm, isChecked]);

  const fetchMovies = async (searchTerm = '', isChecked = false) => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    setRequestError(null);

    try {
      let data;
      const initialMovies = JSON.parse(localStorage.getItem('movies'));

      if (!initialMovies) {
        data = await MoviesApi.getMovies();
        localStorage.setItem('movies', JSON.stringify(data));
      } else {
        data = initialMovies;
      }

      const filteredMovies = filterMovies(data, searchTerm, isChecked);
      setFetchedMovies(filteredMovies);
      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('isChecked', JSON.stringify(isChecked));
      setHasSearched(true);
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isSaved = (movie) => {
    if (Array.isArray(savedMovies)) {
      return savedMovies.some((savedMovie) => savedMovie._id === movie._id);
  } 
};

  return (
    <main className="movies">
      <SearchForm onSubmit={async (term, checked) => fetchMovies(term, checked)} searchTerm={searchTerm} isChecked={isChecked} onError={setFormError} />
      {isLoading ? (
        <Preloader />
        ) : requestError ? (
          <p>Возникла ошибка во время запроса. Возможно проблема в вашем соединении, либо сервер сейчас недоступен. Повторите запрос позже.</p>
        ) : formError ? (
          <p>{formError}</p>
        ) : hasSearched && fetchedMovies.length === 0 ? (
          <p>Ничего не найдено!</p>
        ) : (
          <MoviesCardList
            movies={fetchedMovies}
            isSaved={isSaved}
            saveMovie={saveMovie}
            removeMovie={removeMovie}
          />
      )}
    </main>
  );
}

export default Movies;
