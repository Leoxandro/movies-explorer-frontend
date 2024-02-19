import React from "react";

import Link from "../Link/Link";
import { footerLinks } from "../../utils/constants";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__information">
          <p className="footer__year">&#169; 2024</p>
          <ul className="footer__links">
            {footerLinks.map((link) => (
              <Link key={link.id} {...link} />
            ))}
          </ul>
        </div>
    </footer>
  );
};

export default Footer;