import React, { useState, useContext } from "react";

import "./MoviesCard.css";
import savedPageContext from "../../context/savedPageContext";
import likeIcon from '../../images/saveIcon.svg';
import deleteIcon from '../../images/savedIcon.svg';

function MoviesCard({ title, duration, imageUrl }) {
  const { onSavedPage } = useContext(savedPageContext);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => setIsSaved(!isSaved);
  const handleDelete = () => console.log("Удаление карточки");

  return (
    <li className="movies-card">
      <div className="movies-card__header">
        <img className="movies-card__image" src={imageUrl} alt={title} />
        <button
          className={`movies-card__btn ${
            isSaved && !onSavedPage ? "movies-card__btn_type_red" : ""
          }`}
          onClick={!onSavedPage ? handleSave : handleDelete }
        >
          {onSavedPage
            ? (<img src={deleteIcon} alt='delete' />)
            : (isSaved
              ? ""
              : "Сохранить")}
        </button>
      </div>
      <div className="movies-card__footer">
        <h2 className="movies-card__title">{title}</h2>
          <p className="movies-card__duration">{duration} минут</p>
      </div>
    </li>
  );
};

export default MoviesCard;