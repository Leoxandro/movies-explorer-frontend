import React from "react";
import "./Portfolio.css";
import { ReactComponent as LinkIcon } from "../../images/arrow.svg";
import { PORTFOLIO } from "../../constants/constants";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__headline">Портфолио</h2>
      <ul className="portfolio__links-list">
        {PORTFOLIO.map((item) => (
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
