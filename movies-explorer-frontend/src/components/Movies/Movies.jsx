import React, { useEffect, useContext } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import savedPageContext from "../../context/savedPageContext";
import "./Movies.css";

const allMovies = [
  {
    id: 1,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    title: "В погоне за Бенкси",
    duration: 27,
    imageUrl:
      "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
];

const Movies = ({ savedMovies }) => {
  const { setOnSavedPage } = useContext(savedPageContext);
  useEffect(() => setOnSavedPage(false), [setOnSavedPage]);

  return (
    <div className="movies-page">
      <Header />
        <section className="movies movies-page__movies" aria-label="Фильмы">
          <SearchForm/>
          <MoviesCardList
              data={allMovies}
              onMainPage
          />
          <div className="movies__footer">
            <button className="movies__btn_more">Ещё</button>
          </div>
        </section>
      <Footer />
    </div>
  );
};

export default Movies;