import React, { useState, useContext, useEffect, useCallback } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { SavedMoviesContext } from "../../providers/SavedMoviesProvider";
import { FILMS_URL } from "../../constants/constants";

const MoviesCard = ({ movie, saveMovie, removeMovie }) => {
  const location = useLocation();
  const { savedMovies } = useContext(SavedMoviesContext);

  const [imageUrl, setImageUrl] = useState(null);
  const [foundMovie, setFoundMovie] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (Array.isArray(savedMovies)) {
      const found = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
      setFoundMovie(found);
      setIsSaved(!!found);
    } else {
      setFoundMovie(null);
      setIsSaved(false);
    }
  }, [movie.id, savedMovies]);

  useEffect(() => {
    if (typeof movie.image === "object") {
      setImageUrl(`${FILMS_URL}/${movie.image.url}`);
    } else if (typeof movie.image === "string") {
      setImageUrl(movie.image);
    }
  }, [movie.image]);

  const handleMovieBtnClick = useCallback(async (evt) => {
    evt.preventDefault();

    if (location.pathname === "/movies") {
      if (!isSaved) {
        const savedMovie = await saveMovie(movie);
        setFoundMovie(savedMovie);
        setIsSaved(true);
      } else {
        if (foundMovie && foundMovie._id) {
          await removeMovie(foundMovie._id);
          setFoundMovie(null);
          setIsSaved(false);
        }
      }
    } else if (location.pathname === "/saved-movies") {
      if (movie._id) {
        await removeMovie(movie._id);
      }
    }
  }, [isSaved, movie, location.pathname, foundMovie, saveMovie, removeMovie]);

  return (
    <article className="movie">
      <a
        className="movie__trailer-link"
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="movie__image" src={imageUrl} alt={movie.nameEN} />
      </a>
      <button
          className={`movie__button ${
            location.pathname === "/movies"
              ? `movie__like-button ${isSaved ? "movie__button_active" : ""}`
              : "movie__delete-button"
          }`}
          type="button"
          onClick={handleMovieBtnClick}
      />
      <div className="movie__main">
        <h2 className="movie__title">{movie.nameRU}</h2>
        <span className="movie__duration">
        {movie.duration > 59 ? `${Math.floor(movie.duration / 60)} ч` : null}{" "}
        {movie.duration > 59
          ? `${movie.duration - Math.floor(movie.duration / 60) * 60} м`
          : `${movie.duration} м`}
        </span>
      </div>
    </article>
  );
}

export default MoviesCard;