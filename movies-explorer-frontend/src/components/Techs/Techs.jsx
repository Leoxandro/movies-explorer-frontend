import React from "react";

import TechIcon from "../TechIcon/TechIcon";
import { STACK } from "../../utils/constants";
import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs" id="techs">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__texts">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__description">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="techs__list">
          {STACK.map((tech) => (
            <TechIcon key={tech} title={tech} />
          ))}
        </ul>
    </section>
  );
};

export default Techs;