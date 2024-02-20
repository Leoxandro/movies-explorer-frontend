import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const backHandler = () => navigate('/');

  return (
    <section className="not-found">
      <div className="not-found__content">
        <div className="not-found__text">
          <p className="not-found__error">404</p>
          <h2 className="not-found__title">Страница не найдена</h2>
        </div>
        <button className="not-found__back" onClick={backHandler}>
          Назад
        </button>
      </div>
    </section>
  );
};

export default NotFound;