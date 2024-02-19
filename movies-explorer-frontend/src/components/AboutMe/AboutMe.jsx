import React from "react";

import Link from "../Link/Link";
import Project from "../Project/Project";
import photo from "../../images/avatar.jpeg";
import { socialLinks, projects } from "../../utils/constants";
import "./AboutMe.css";

const AboutMe = () => {
  return (
      <section className="about-me main__about-me" id="student">
        <h2 className="student__title">Студент</h2>
        <div className="student about-me__student">
          <div className="student__information">
            <h3 className="student__name">Алексей</h3>
            <p className="student__about">
              Начинающий фронтенд-разработчик, 27 лет
            </p>
            <p className="student__description">
              Живу в Санкт-Петербурге. Окончил ЛЭТи по специальности микро- и нано-электроника более 5 лет назад, но не нашёл применения себя в этой области. Ещё в детстве была мечта изучать программирование и год назад решил встать на путь обучения. Премного благодарен себе за такую находку. Увлёкся с головой и планирую развиваться в этой области дальше.  
            </p>
            <ul className="student__socials">
              {socialLinks.map((link) => (
                <Link key={link.id} {...link} />
              ))}
            </ul>
          </div>
          <img className="student__photo" src={photo} alt="Алексей" />
        </div>
        <div className="portfolio">
          <h3 className="portfolio__title">Портфолио</h3>
          <ul className="portfolio__projects">
            {projects.map((project) => (
              <Project key={project.id} {...project} />
            ))}
          </ul>
        </div>
      </section>
  );
};

export default AboutMe;