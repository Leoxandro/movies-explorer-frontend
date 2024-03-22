import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../providers/CurrentUserContext";

export const ProtectedRoute = ({ element: Component, ...props }) => {
  const { user } = useContext(CurrentUserContext);
  return user ? <Component {...props} /> : <Navigate to="/" replace />;
};

export const SignedRoute = ({ element: Component, ...props }) => {
  const { user } = useContext(CurrentUserContext);
  return user ? <Navigate to="/" replace /> : <Component {...props} />;
};

