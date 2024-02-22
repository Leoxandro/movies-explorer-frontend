import React from "react";

import "./Project.css";

const Project = ({ title, url }) => {
  return (
    <li className="project">
      <a href={url} className="project__link" target="_blank" rel="noreferrer">
        {title}
        <div className="project__icon"></div>
      </a>
    </li>
  );
};

export default Project;