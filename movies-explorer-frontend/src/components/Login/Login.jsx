import React from "react";

import UnauthPage from "../UnauthPage/UnauthPage";
import Input from "../Input/Input";
import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";
import "./Login.css";

const Login = ({ submitHandler, isLoading, message }) => {
  // получаем необходимые данные из хука валидации
  const { values, errors, handleChange, isFormValid, setIsFormValid } =
    useCustomValidation();
  // получаем кол-во инпутов, которое нужно для валидации
  const amountInputs = countInputs(".input");

  useFormValidity(values, errors, amountInputs, setIsFormValid);

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(values["email"], values["password"]);
  };

  return (
    <main className="main"> 
      <UnauthPage
        title="Рады видеть!"
        text="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
      >
        <form className="login" name="login" onSubmit={onSubmit} noValidate>
          <fieldset className="login__inputs">
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
              placeholder='Введите email'
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
              placeholder='Введите пароль'
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
            className={`login__btn_type_submit ${
              (!isFormValid || isLoading) && "login__btn_type_disabled"
            }`}
            type="submit"
            isFormValid={isFormValid}
            isLoading={isLoading}
          >
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </UnauthPage>
    </main>
  );
};

export default Login;