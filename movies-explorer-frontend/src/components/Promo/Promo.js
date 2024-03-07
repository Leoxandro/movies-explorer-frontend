import React from "react";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
        </div>
        <div className="promo__caption">
            <button
                className="promo__button"
                onClick={() =>
                document
                    .getElementById("about")
                    .scrollIntoView({ behavior: "smooth" })
                }
                type="button"
            >
                О проекте
            </button>
            <button
            className="promo__button"
            onClick={() =>
                document
                .getElementById("techs")
                .scrollIntoView({ behavior: "smooth" })
            }
            type="button"
            >
                Технологии
            </button>
            <button
                className="promo__button"
                onClick={() =>
                document
                    .getElementById("student")
                    .scrollIntoView({ behavior: "smooth" })
                }
                type="button"
            >
                Студент
            </button>
        </div>
      </div>
    </section>
  );
}

export default Promo;
