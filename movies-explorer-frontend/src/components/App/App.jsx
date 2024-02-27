import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedMovies from '../SavedMovies/SavedMovies';
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import './App.css';
import currentUserContext from '../../context/currentUserProvider';
import * as auth from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';
import {
  DEFAULT_ERROR_MESSAGE,
  NOTIFICATION_DURATION,
} from "../../utils/constants";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileMessageModifier, setProfileMessageModifier] = useState(false);
  const [savedMoviesMessage, setSavedMoviesMessage] = useState("");
  const [unauthPageMessage, setUnauthPageMessage] = useState("");
  const [popupError, setPopupError] = useState("");
  const [popupErrorStatus, setPopupErrorStatus] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && !popupErrorStatus) {
      setIsLoggedIn(true);
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        navigate("/movies");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, isLoggedIn, location.pathname, navigate, popupErrorStatus]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUserInfo(token)
        .then(([response]) => setCurrentUser(response))
        .catch((err) => {
          showPopupError(err.message);
          setIsLoggedIn(false);
          navigate("/signin");
        });
    }
  }, [token, isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn && !popupErrorStatus) {
      mainApi
        .getSavedMovies(token)
        .then((response) => {
          const moviesData = response.data; // Access the 'data' property
          // Check if moviesData is an array before using filter
          if (Array.isArray(moviesData)) {
            const ownSavedMovies = moviesData.filter(
              (movie) => movie.owner === currentUser._id
            );
            localStorage.setItem("savedMovies", JSON.stringify(ownSavedMovies));
            setSavedMovies(ownSavedMovies);
            setSavedMoviesMessage("");
          } else {
            // Handle the case where moviesData is not an array
            console.error("moviesData is not an array:", moviesData);
            setSavedMoviesMessage(DEFAULT_ERROR_MESSAGE);
          }
        })
        .catch((err) => {
          setSavedMoviesMessage(DEFAULT_ERROR_MESSAGE);
          console.log(err);
        });
    }
  }, [currentUser._id, setSavedMovies, token, popupErrorStatus, isLoggedIn]);

  const showProfileMessage = (text, modifier) => {
    setProfileMessage(text);
    setProfileMessageModifier(modifier);
    setTimeout(() => setProfileMessageModifier(""), NOTIFICATION_DURATION);
  }

  const showPopupError = (text = "Что-то пошло не так") => {
    setPopupError(text);
    setPopupErrorStatus(true);
    setTimeout(() => setPopupErrorStatus(false), NOTIFICATION_DURATION);
  }

  const registerUser = (name, email, password) => {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          loginUser(email, password);
          setUnauthPageMessage("");
          navigate("/signin");
        }
      })
      .catch((err) => {
        if (err instanceof Response) {
          err.json().then((error) => {
            if (error?.message) {
              setUnauthPageMessage(error.message);
            }
          });
        } else {
          console.log(err);
        }
      })
      .finally(() => setIsLoading(false));
  }
  
  const loginUser = (email, password) => {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          navigate("/movies");
          setUnauthPageMessage("");
        }
      })
      .catch((err) => {
        if (err instanceof Response) {
          err.json().then((error) => {
            if (error?.message) {
              setUnauthPageMessage(error.message);
            }
          });
        } else {
          console.log(err);
        }
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoading(false));
  }

  const updateUserInfo = (userDataFromForm) => {
    setIsLoading(true);
    mainApi
      .editCurrentUserInfo(userDataFromForm, token)
      .then((userDataUpdated) => {
        setCurrentUser({
          name: userDataUpdated.name,
          email: userDataUpdated.email,
        });
        showProfileMessage("Изменения сохранены", "success");
      })
      .catch((err) => showProfileMessage(err.message, "fail"))
      .finally(() => setIsLoading(false));
  }

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
      <ErrorPopup text={popupError} isVisible={popupErrorStatus} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<Navigate to='/404' />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='/signin' element={<Login
            submitHandler={loginUser}
            isLoading={isLoading}
            message={unauthPageMessage}
            setMessage={setUnauthPageMessage}
          />} />
          <Route path='/signup' element={<Register 
            submitHandler={registerUser}
            isLoading={isLoading}
            message={unauthPageMessage}
            setMessage={setUnauthPageMessage}
          />} />
          <Route path='/profile' element={<ProtectedRoute 
            element={Profile}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            submitHandler={updateUserInfo}
            isLoading={isLoading}
            message={profileMessage}
            messageModifier={profileMessageModifier}
          />} />
          <Route path='/movies' element={<ProtectedRoute
            element={Movies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            message={savedMoviesMessage}
            cardErrorHandler={showPopupError}
          />} />
          <Route path='/saved-movies' element={<ProtectedRoute
            element={SavedMovies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            message={savedMoviesMessage}
            cardErrorHandler={showPopupError}
          />} />
        </Routes>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
