import React from "react";

import './Promo.css';
import NavTab from "../NavTab/NavTab.jsx";

const Promo = () => {
    return (
        <section className="promo main__promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <NavTab />
        </section>
    );
};

export default Promo;