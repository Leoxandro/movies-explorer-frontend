import React from "react";
import { NavLink } from "react-router-dom";

import "./SideBar.css";

const Sidebar = ({ isOpen, closeHandler }) => {
  return (
    <div className={`app__overlay ${isOpen ? "app__overlay_visible" : ""}`}>
      <div
        className={`sidebar ${isOpen ? "sidebar_visible" : "sidebar_hidden"}`}
      >
        <nav className="sidebar__links">
          <NavLink
            className="sidebar__link"
            to="/"
            exact
          >
            Главная
          </NavLink>
          <NavLink
            className="sidebar__link"
            to="/movies"
          >
            Фильмы
          </NavLink>
          <NavLink
            className="sidebar__link"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <NavLink className="sidebar__acc-btn" to="/profile">
            Аккаунт
        </NavLink>
        <div className="sidebar__close-icon" onClick={closeHandler}></div>
      </div>
    </div>
  );
};

export default Sidebar;