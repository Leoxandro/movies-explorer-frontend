import React, { useState, useEffect, useContext } from "react";
import MainApi from "../utils/MainApi";
import { CurrentUserContext } from "../providers/CurrentUserContext";

export const SavedMoviesContext = React.createContext([]);

export function SavedMoviesProvider({ children }) {
  const { user } = useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (user) {
        try {
          const movies = await MainApi.getMovies();
          setSavedMovies(movies.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchSavedMovies();
  }, [user]);

  const saveMovie = async (movie) => {
    if (!user) {
      return;
    }
    try {
      const data = await MainApi.addMovie(movie);
      setSavedMovies((prevMovies) => [...prevMovies, data.data]);
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
      setSavedMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SavedMoviesContext.Provider
      value={{ savedMovies, setSavedMovies, saveMovie, removeMovie }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
}
