import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { settings } from "../../constants/constants";

function MoviesCardList({ movies, isSaved, saveMovie, removeMovie }) {
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
  const [moviesPerPage, setMoviesPerPage] = useState(0);
  const [addMovies, setAddMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const resizeListener = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(() => {
        setWindowDimensions(window.innerWidth);
      }, 500);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  useEffect(() => {
    const currentSetting = settings.find(
      (setting) => windowDimensions >= setting.width
    ) || settings[0];
    setMoviesPerPage(currentSetting.moviesPerPage);
    setAddMovies(currentSetting.addMovies);
  }, [windowDimensions]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const currentMovies = movies.slice(0, indexOfLastMovie);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + addMovies/moviesPerPage);
  };

  const isLoadMoreButtonDisabled = currentMovies.length === movies.length;

  return (
    <section className="movies-list">
      <ul className="movies-list__items">
        {currentMovies.map((movie) => (
          <li key={movie._id || movie.id} >
            <MoviesCard
              movie={movie}
              isSaved={isSaved(movie)}
              saveMovie={saveMovie}
              removeMovie={removeMovie}
            />
          </li>
        ))}
      </ul>
      <div className="movies-list__button-container">
        {!isLoadMoreButtonDisabled && (
          <button className="movies-list__button" onClick={handleLoadMore}>
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
