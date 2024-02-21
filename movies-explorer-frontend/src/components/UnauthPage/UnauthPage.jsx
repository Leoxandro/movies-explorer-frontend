import React from "react";
import { Link } from "react-router-dom";

import logo from '../../images/logo.svg';
import "./UnauthPage.css";

const UnauthPage = ({ title, children, text, link, linkText }) => {
  return (
    <section className="unauth-page">
      <div className="unauth-page__container">
        <Link to="/">
          <img className="logo unauth-page__logo" src={logo} alt='logo'/>
        </Link>
        <h1 className="unauth-page__title">{title}</h1>
        {children}
        <p className="unauth-page__text">
          {text}{" "}
          <Link className="unauth-page__link" to={link}>
            {linkText}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default UnauthPage;