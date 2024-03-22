import React from "react";
import images from "../../utils/images";
import Headline from "../HeadLine/HeadLine";
import "./AboutMe.css";

function AboutMe() {
  return (
      <section className="student" id='student'>
      <Headline title={"Student"} />
      <div className="student__container">
        <div className="student__image-container">
          <img
            className="student__image"
            src={images.studentPicture}
            alt="Student"
          />
        </div>
        <div className="student__text-container">
          <h3 className="student__title">Алексей</h3>
          <span className="student__caption">Начинающий фронтенд-разработчик, 27 лет</span>
          <p className="student__bio">
          Живу в Санкт-Петербурге. Окончил ЛЭТи по специальности микро-
            и нано-электроника более 5 лет назад, но не нашёл применения
          себя в этой области. Ещё в детстве была мечта изучать
          программирование и год назад решил встать на путь обучения.
          Премного благодарен себе за такую находку.
          Увлёкся с головой и планирую развиваться в этой области дальше.  
          </p>
          <a
            className="student__github-link"
            href="https://github.com/Leoxandro"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
