import React, { useState, useEffect, useContext } from "react";
import MainApi from "../utils/MainApi";
import { CurrentUserContext } from "../providers/CurrentUserContext";

export const SavedMoviesContext = React.createContext([]);

export function SavedMoviesProvider({ children }) {
  const { user } = useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = useState([]);

  const saveMovie = async (movie) => {
    if (!user) {
      return;
    }
    try {
      const data = await MainApi.addMovie(movie);
      setSavedMovies((moviesArray) => {
        if (Array.isArray(moviesArray)) {
          const updatedMovies = [...moviesArray, data];
          setSavedMovies(updatedMovies.data);
          return updatedMovies;
        } else {
          console.error("Invalid structure for savedMovies");
          return data;
        }
      });
      fetchSavedMovies();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeMovie = async (id) => {
    if (!user) {
      return;
    }
    try {
      await MainApi.deleteMovie(id);
      setSavedMovies((moviesArray) =>
        moviesArray.filter((movie) => movie._id !== id)
      );
      fetchSavedMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSavedMovies = async () => {
    if (!user) {
      return;
    }
    try {
      const movies = await MainApi.getMovies();
      setSavedMovies(movies.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSavedMovies();
  }, [user]); //eslint-disable-line

  return (
    <SavedMoviesContext.Provider
      value={{ savedMovies, setSavedMovies, saveMovie, removeMovie }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
}