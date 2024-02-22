import React from "react";

import { navTabs } from "../../utils/constants";
import "./NavTab.css";

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        {navTabs.map((tab) => (
          <li key={tab.id} className="nav-tab__item">
            <a className="nav-tab__link" href={tab.url}>
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavTab;