import React from "react";

import Input from "../Input/Input";
import UnauthPage from "../UnauthPage/UnauthPage";
import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";
import "./Register.css";

const Register = ({ submitHandler, isLoading, message }) => {
  const { values, errors, handleChange, isFormValid, setIsFormValid } =
    useCustomValidation();
  const amountInputs = countInputs(".input");

  useFormValidity(values, errors, amountInputs, setIsFormValid);

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(values["name"], values["email"], values["password"]);
  };

  return (
    <UnauthPage
      title="Добро пожаловать!"
      text="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
    >
      <form className="register" name="register" onSubmit={onSubmit} noValidate>
        <fieldset className="register__inputs">
          <Input
            name="name"
            label="Имя"
            modifier="unauth"
            value={values["name"] || ""}
            error={errors["name"]}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            disabled={isLoading}
          />
          <Input
            name="email"
            label="E-mail"
            modifier="unauth"
            value={values["email"] || ""}
            error={errors["email"]}
            onChange={handleChange}
            type="email"
            autoComplete="off"
            disabled={isLoading}
          />
          <Input
            name="password"
            label="Пароль"
            modifier="unauth"
            value={values["password"] || ""}
            error={errors["password"]}
            onChange={handleChange}
            type="password"
            autoComplete="off"
            disabled={isLoading}
          />
        </fieldset>
        <p
          className={`unauth-page__message ${
            message ? "unauth-page__message_type_fail" : ""
          }`}
        >
          {message}
        </p>
        <button
          className={`register__btn_type_submit ${
            (!isFormValid || isLoading) && "register__btn_type_disabled"
          }`}
          type="submit"
          isFormValid={isFormValid}
          isLoading={isLoading}
        >
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </form>
    </UnauthPage>
  );
};

export default Register;