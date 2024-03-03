import React, { useState } from "react";

import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";
import "./SearchForm.css";

const SearchForm = ({
  submitHandler,
  checkbox,
  isLoading,
}) => {
  const [errorText, setErrorText] = useState("");
  const {
    values,
    errors,
    isFormValid,
    setIsFormValid,
  } = useCustomValidation();
  const amountInputs = countInputs(".search-form__input");

  useFormValidity(values, errors, amountInputs, setIsFormValid);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (values["film-query"] === undefined) {
      setErrorText("Запрос не может быть пустым");
      return;
    }
    if (isFormValid) {
      submitHandler(checkbox, values["film-query"]);
      setErrorText("");
    }
    setErrorText(errors["film-query"]);
  };

  return (
    <form
      className="search-form app__search-form"
      name="search-movie"
      onSubmit={onSubmitForm}
      noValidate
    >
      <div className="search-form__string">
        <input
          className={`search-form__input ${
            isLoading ? "search-form__input_disabled" : ""
          }`}
          name="film-query"
          placeholder="Фильм"
          type="text"
          required
          autoComplete="off"
          disabled={isLoading}
        />
        <button
          className={`search-form__btn ${
            isLoading && "search-form__btn_type_disabled"
          }`}
          type="submit"
          isLoading={isLoading}
        >
        </button>
      </div>
      <span className="search-form__error">{errorText}</span>
      <label
        className={`search-form__label ${
          isLoading && "search-form__label_disabled"
        }`}
        htmlFor="short-film"
      >
        <input
          className="search-form__radio"
          type="checkbox"
          name="short-film-option"
          id="short-film"
          value="short-film"
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