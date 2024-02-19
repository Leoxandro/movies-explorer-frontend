import React from "react";
import { NavLink, Link } from "react-router-dom";

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
            activeClassName="sidebar__link_active"
            to="/"
            exact
          >
            Главная
          </NavLink>
          <NavLink
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/movies"
          >
            Фильмы
          </NavLink>
          <NavLink
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link className="sidebar__linked-button" to="/profile">
            <button className="sidebar__btn_type-acc">Аккаунт</button>
        </Link>
        <div className="sidebar__close-icon" onClick={closeHandler}></div>
      </div>
    </div>
  );
};

export default Sidebar;