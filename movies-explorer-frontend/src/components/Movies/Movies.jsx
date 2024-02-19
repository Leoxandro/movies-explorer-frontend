import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

const Movies = ({ savedMovies }) => {
  return (
    <div className="movies-page">
      <Header />
        <section className="movies movies-page__movies" aria-label="Фильмы">
          <SearchForm/>
          <Preloader />
          <MoviesCardList
              savedMovies={savedMovies}
              onSavedPage={false}
          />
          <p className="movies__message"></p>
          <div className="movies__footer">
            <button className="movies__btn_more"></button>
          </div>
        </section>
      <Footer />
    </div>
  );
};

export default Movies;