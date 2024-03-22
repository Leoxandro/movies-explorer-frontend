import React, { useContext, useState, useMemo, useEffect } from "react";
import "./SavedMovies.css";
import { SavedMoviesContext } from "../../providers/SavedMoviesProvider";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { filterMovies } from "../../utils/movieUtils";
import { useNavigate } from "react-router-dom";

function SavedMovies() {
  const { savedMovies, removeMovie } = useContext(SavedMoviesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [formError, setFormError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();

  const updateFilteredMovies = useMemo(() => {
    return filterMovies(savedMovies, searchTerm, isChecked);
  }, [savedMovies, searchTerm, isChecked]);

  useEffect(() => {
    // Обновляем filteredMovies при переходе на страницу /saved-movies
    setFilteredMovies(updateFilteredMovies);
  }, [updateFilteredMovies, navigate]);

  function handleSearch(term, isChecked) {
    setSearchTerm(term);
    setIsChecked(isChecked);
  }

  return (
    <main className="saved-movies">
      <SearchForm onSubmit={handleSearch} searchTerm={searchTerm || ''} onError={setFormError} isOnSavedMoviesPage={true} />
      {formError && <p>{formError}</p>}
      {filteredMovies.length === 0 && <p>Ничего не найдено!</p>}
      <MoviesCardList
        movies={filteredMovies}
        isSaved={() => true}
        saveMovie={() => {}}
        removeMovie={removeMovie}
      />
    </main>
  );
}

export default SavedMovies;