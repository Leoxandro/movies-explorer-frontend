import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MainApi from "../utils/MainApi";
import AuthApi from '../utils/AuthApi';
import Preloader from "../components/Preloader/Preloader";

export const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiErrMsg, setApiErrMsg] = useState(null);

  useEffect(() => {
    setApiErrMsg(null);
  }, [navigate])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.getUser(jwt)
        .then((data) => {
          setUser(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          navigate("/signin");
        });
    } else {
      setIsLoading(false);
    }
  }, []); //eslint-disable-line

  function handleSignOut() {
    setUser({});
    setApiErrMsg(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchTerm');
    localStorage.removeItem('isChecked');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    navigate("/");
  }

  const handleSignUp = useCallback(
    async (data) => {
      try {
        setApiErrMsg(null);
        await AuthApi.signUp(data);
        const { token } = await AuthApi.signIn({
          email: data.email,
          password: data.password
        });
        localStorage.setItem("jwt", token);
        setUser(data);
        setApiErrMsg(null);
        navigate("/movies");
      } catch (err) {
        console.error(err);
        setApiErrMsg("Произошла ошибка регистрации. Пожалуйста, повторите попытку позже.");
      }
    },
    [navigate]
  );

  const handleSignIn = useCallback(
    async (data) => {
      setApiErrMsg(null);
      try {
        const { token } = await AuthApi.signIn(data);
        localStorage.setItem("jwt", token);
        return MainApi.getUser(token)
          .then((userData) => {
            setUser(userData);
            setApiErrMsg(null);
            navigate("/movies");
          });
      } catch (err) {
        console.error(err);
        setApiErrMsg("Произошла ошибка входа. Пожалуйста, проверьте ваши учетные данные и повторите попытку.");
      }
    },
    [navigate]
  );

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        setUser,
        apiErrMsg,
        setApiErrMsg,
        handleSignOut,
        handleSignUp,
        handleSignIn,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
