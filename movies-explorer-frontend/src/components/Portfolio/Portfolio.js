import React from "react";
import "./Portfolio.css";
import { ReactComponent as LinkIcon } from "../../images/arrow.svg";

function Portfolio() {
  const portfolio = [
    {
      path: "https://leoxandro.github.io/how-to-learn/",
      title: "Статичный сайт",
    },
    {
      path: "https://leoxandro.github.io/russian-travel/",
      title: "Адаптивный сайт",
    },
    {
      path: "https://github.com/Leoxandro/react-mesto-api-full-gha",
      title: "Одностраничная соц-сеть",
    },
  ];

  return (
    <section className="portfolio">
      <h2 className="portfolio__headline">Портфолио</h2>
      <ul className="portfolio__links-list">
        {portfolio.map((item) => (
          <li className="portfolio__links-item" key={item.title}>
            <a
              className="portfolio__link"
              href={item.path}
              rel="noreferrer"
              target="_blank"
            >
              {item.title}
              <LinkIcon className="portfolio__link-arrow"/>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Portfolio;
