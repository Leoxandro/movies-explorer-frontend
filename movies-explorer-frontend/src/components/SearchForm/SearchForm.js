import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import { ReactComponent as SearchIcon } from "../../images/searchIcon.svg";

function SearchForm({ onSubmit, searchTerm, isChecked, onError, isOnSavedMoviesPage }) {
  const [input, setInput] = useState(searchTerm || '');
  const [checkbox, setCheckbox] = useState(isChecked || false);
  
  useEffect(() => {
    setInput(searchTerm || '');
  }, [searchTerm]);

  useEffect(() => {
    setCheckbox(isChecked);
  }, [isChecked]);

  const handleCheckboxChange = () => {
    const newCheckboxState = !checkbox;
    setCheckbox(newCheckboxState);
    onSubmit(input, newCheckboxState);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input && !isOnSavedMoviesPage) {
      onError('You need to enter a keyword');
    } else {
      onError(null)
      onSubmit(input, checkbox);
    }
  };

  return (
    <form
      className="search-form app__search-form"
      name="search-movie"
      onSubmit={handleSubmit}
    >
      <div className="search-form__string">
        <input
          className='search-form__input'
          name="film-query"
          placeholder="Фильм"
          type="text"
          required
          value={input}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <button
          className="search-form__btn"
          type="submit"
        >
          <SearchIcon className="search-form__icon"/>
        </button>
      </div>
      <label
        className="search-form__label"
        htmlFor="short-film"
      >
        <input
          className="search-form__radio"
          type="checkbox"
          name="short-film-option"
          id="short-film"
          value="short-film"
          checked={checkbox}
          onChange={handleCheckboxChange}
        />
        <span className="search-form__pseudo-item">
          <span className="search-form__circle"></span>
        </span>
        <span className="search-form__label-text">Короткометражки</span>
      </label>
    </form>
  );
};

export default SearchForm;
