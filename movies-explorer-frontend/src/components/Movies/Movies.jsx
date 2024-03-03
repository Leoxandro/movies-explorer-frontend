import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";
import { beatFilmApi } from "../../utils/MoviesApi";
import { findOnlyShortMovies, filterMovies } from "../../utils/filters";
import { useGetWidthBrowser } from "../../hooks/useGetWidthBrowser";
import { getId } from "../../utils/getId";
import "./Movies.css";
import { 
  DEFAULT_ERROR_MESSAGE,
  LAPTOP_WIDTH,
  LARGE_NEXT_PAGE_CARDS_COUNT,
  LARGE_PAGE_CARDS_COUNT,
  MOBILE_WIDTH,
  MEDIUM_NEXT_PAGE_CARDS_COUNT,
  MEDIUM_PAGE_CARDS_COUNT,
  SMALL_NEXT_PAGE_CARDS_COUNT,
  SMALL_PAGE_CARDS_COUNT,
  ADDING_PAGE_AMOUNT,
} from "../../utils/constants";

const Movies = ({ savedMovies, setSavedMovies, cardErrorHandler }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCardsAmount, setInitialCards] = useState(0);
  const [cardsPage, setCardsPage] = useState(0);
  const [cardsInBundle, setCardsInBundle] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const cardsCount = initialCardsAmount + cardsInBundle * cardsPage;
  const token = localStorage.getItem("token");
  const queryData = localStorage.getItem("queryData");
  const width = useGetWidthBrowser();

  let allMovies = localStorage.getItem("allMoviesData");
  let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
  let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

  useEffect(() => {
    if (width >= LAPTOP_WIDTH) {
      setInitialCards(LARGE_PAGE_CARDS_COUNT);
      setCardsInBundle(LARGE_NEXT_PAGE_CARDS_COUNT);
    } else if (width > MOBILE_WIDTH && width < LAPTOP_WIDTH) {
      setInitialCards(MEDIUM_PAGE_CARDS_COUNT);
      setCardsInBundle(MEDIUM_NEXT_PAGE_CARDS_COUNT);
    } else if (width <= MOBILE_WIDTH) {
      setInitialCards(SMALL_PAGE_CARDS_COUNT);
      setCardsInBundle(SMALL_NEXT_PAGE_CARDS_COUNT);
    }
  }, [width]);

  useEffect(() => {
    if (queryData) {
      setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
      setShortFilmsCheck(JSON.parse(queryData)?.isOnlyShortFilms);
    }
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      shortFilmsCheck
        ? setMovies(filteredShortMovies.slice(0, cardsCount))
        : setMovies(filteredMovies.slice(0, cardsCount));
    }
  }, [shortFilmsCheck, cardsCount, errorMessage]);

  useEffect(() => {
    if (queryData) {
      const updatedQueryData = JSON.parse(queryData);
      updatedQueryData.isOnlyShortFilms = shortFilmsCheck;
      localStorage.setItem("queryData", JSON.stringify(updatedQueryData));
    }
  }, [shortFilmsCheck, queryData]);

  useEffect(() => {
    window.addEventListener("beforeunload", removeAllMoviesData);
    return () => {
      window.removeEventListener("beforeunload", removeAllMoviesData);
    };
  }, []);

  const removeAllMoviesData = () => localStorage.removeItem("allMoviesData");


  const submitHandler = async (isOnlyShortFilms, searchQuery) => {
    try {
      setIsLoading(true);
      if (!allMovies) {
        const allMoviesData = await beatFilmApi.getMovies();
        localStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
        allMovies = localStorage.getItem("allMoviesData");
      }
      filteredMovies = filterMovies(searchQuery, JSON.parse(allMovies));
      filteredShortMovies = findOnlyShortMovies(filteredMovies);
      const queryData = {
        filteredMovies,
        filteredShortMovies,
        searchQuery,
        isOnlyShortFilms,
      };
      localStorage.setItem("queryData", JSON.stringify(queryData));

      if (isOnlyShortFilms) {
        setMovies(filteredShortMovies.slice(0, initialCardsAmount));
        if (filteredShortMovies.length === 0) {
          setResultMessage("Ничего не найдено");
        }
      } else {
        setMovies(filteredMovies.slice(0, initialCardsAmount));
        if (filteredShortMovies.length === 0) {
          setResultMessage("Ничего не найдено");
        }
      }

      setErrorMessage("");
      setIsLoading(false);
    } catch (err) {
      setMovies([]);
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
      console.log(err);
      setIsLoading(false);
    }
  };

  const moreButtonHandler = () =>
    setCardsPage((prev) => prev + ADDING_PAGE_AMOUNT);

  const saveMovie = (movie, likeHandler) => {
    mainApi
      .createMovie(movie, token)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        likeHandler(true);
      })
      .catch((err) => err.json())
      .then((err) => {
        if (err?.message) {
          cardErrorHandler(err.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteMovie = (movieId, likeHandler) => {
    const idInSavedMovies = getId(movieId, savedMovies);
    mainApi
      .removeMovie(idInSavedMovies, token)
      .then(() => {
        likeHandler(false);
        setSavedMovies((state) =>
          state.filter((m) => m._id !== idInSavedMovies)
        );
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="movies-page">
      <Header />
      <main className="main">
        <section className="movies movies-page__movies" aria-label="Фильмы">
          <SearchForm 
            submitHandler={submitHandler}
            checkbox={shortFilmsCheck}
            setCheckbox={setShortFilmsCheck}
            lastSearchQuery={lastSearchQuery}
            isLoading={isLoading}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList 
              allMovies={movies}
              savedMovies={savedMovies}
              onSaveHandler={saveMovie}
              onDeleteHandler={deleteMovie}
              onSavedPage={false}
            />
          )}
          {!isLoading && (
             <p className="movies__message">{errorMessage || resultMessage}</p>
          )}
          <div className="movies__footer">
            <button className="movies__footer-btn" type="button" onClick={moreButtonHandler}>Ещё</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;