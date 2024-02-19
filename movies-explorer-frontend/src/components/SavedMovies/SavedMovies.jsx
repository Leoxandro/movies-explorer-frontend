import React from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = () => {
    return (
        <div className="saved-movies-page">
        <Header />
        <section
            className="movies saved-movies-page__movies"
            aria-label="Сохраненные фильмы"
            >
            <SearchForm />
                <MoviesCardList
                onSavedPage={true}
                />
            <p className="movies__message"></p>
        </section>
        <Footer />
        </div>
    );
};

export default SavedMovies;