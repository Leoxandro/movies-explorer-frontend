import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
    });
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("queryData");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("allMoviesData");
        setIsLoggedIn(false);
        navigate("/");
        setCurrentUser({
          name: "",
          email: "",
        });
      };
    return (
        <>
            <main className="main">
                <button type="button" onClick={signOut}></button>
            </main>
        </>
    );
};

export default SignOut;