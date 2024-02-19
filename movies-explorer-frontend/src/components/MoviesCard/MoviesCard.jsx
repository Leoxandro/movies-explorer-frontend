import React, { useState, useEffect } from "react";

import "./MoviesCard.css";
import likeIcon from '../../images/saveIcon.svg';
import deleteIcon from '../../images/savedIcon.svg';

const MoviesCard =({
  onSavedPage,
  savedMovies,
  onSaveHandler,
  onDeleteHandler,
  ...props
}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);

  const handleSave = () => {
    const movieData = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: props.image.url,
      trailerLink: props.trailerLink,
      nameRU: props.nameRU || props.nameEN,
      nameEN: props.nameEN || props.nameRU,
      thumbnail: props.image.formats.thumbnail.url,
      movieId: props.id,
    };
    onSaveHandler(movieData, setIsSaved);
  };

  const handleDelete = () => {
    onDeleteHandler(props._id || props.id, setIsSaved);
  };

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <h2 className="movies-card__title">{props.nameRU}</h2>
        <p className="movies-card__duration">
          {props.duration}
        </p>
      </div>
      <a
        className="movies-card__link"
        href={props.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={onSavedPage ? props.image : props.image.url}
          alt={props.nameRU}
        />
      </a>

      <div className="movies-card__footer">
        <button
          className={`movies-card__btn ${
             isSaved && !onSavedPage
              ? "movies-card__btn_type_red"
              : "movies-card__btn_type_gray"
          }`}
          handler={onSavedPage
            ? handleDelete
            : isSaved
              ? handleDelete
              : handleSave}
        >
          {onSavedPage
            ? (<div>{deleteIcon}</div>)
            : (isSaved
              ? (<div>{likeIcon}</div>)
              : "Сохранить")}
        </button>
      </div>
    </li>
  );
};

export default MoviesCard;