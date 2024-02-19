import React from "react";

import TextCard from "../TextCard/TextCard";
import Roadmap from "../RoadMap/RoadMap";
import { diplomaTextCards } from "../../utils/constants";
import "./AboutProject.css";

const AboutProject = () => {
  return (
      <section className="about" id="about">
        <h2 className="about__title">О проекте</h2>
        <div className="about__cards">
          {diplomaTextCards.map((card) => (
            <TextCard key={card.id} {...card} />
          ))}
        </div>
        <Roadmap />
      </section>
  );
};

export default AboutProject;