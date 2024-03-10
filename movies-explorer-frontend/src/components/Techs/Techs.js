import React from "react";
import "./Techs.css";
import Headline from "../HeadLine/HeadLine";
import { TECHS } from "../../constants/constants";

function Techs() {
  return (
    <section className="techs" id='techs'>
      <Headline title={"Технологии"} />
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__caption">
          На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
        </p>
        <ul className="techs__list">
          {TECHS.map((tech) => (
            <li key={tech} className="techs__list-item">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Techs;
