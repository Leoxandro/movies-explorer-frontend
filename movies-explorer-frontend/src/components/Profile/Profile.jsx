import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Input from "../Input/Input";
import currentUserContext from "../../context/currentUserProvider";
import { useCustomValidation } from "../../hooks/useCustomValidation";
import { useFormValidity } from "../../hooks/useFormValidity";
import { countInputs } from "../../utils/countInputs";
import "./Profile.css";

const Profile = ({
  message,
  isLoading,
  messageModifier,
}) => {
  const { currentUser } = useContext(currentUserContext);
  const currentUserData = { name: currentUser.name, email: currentUser.email };
  const {
    values,
    errors,
    setValues,
    handleChange,
    isFormValid,
    setIsFormValid,
  } = useCustomValidation(currentUser.name, currentUser.email);
  const navigate = useNavigate();
  const amountInputs = countInputs(".input");

  useFormValidity(
    values,
    errors,
    amountInputs,
    setIsFormValid,
    currentUserData
  );

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.name, currentUser.email, setValues]);

  const signOut = () => {
    navigate("/signin");
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
  <>
    <Header />
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name || "Имя пользователя"}!`}</h1>
          <form className="profile__form" onSubmit={onSubmitForm} noValidate>
            <fieldset className="profile__inputs">
              <Input
                name="name"
                label="Имя"
                modifier="profile"
                type="text"
                onChange={handleChange}
                value={values["name"] || ""}
                error={errors["name"]}
                autoComplete="off"
                disabled={isLoading}
                placeholder='Введите имя пользователя'
              />
              <Input
                name="email"
                label="E-mail"
                modifier="profile"
                type="email"
                onChange={handleChange}
                value={values["email"] || ""}
                error={errors["email"]}
                autoComplete="off"
                disabled={isLoading}
                placeholder='Введите email'
              />
            </fieldset>
            <p
              className={`profile__error-message ${
                messageModifier
                  ? `profile__error-message_type_${messageModifier}`
                  : ""
              }`}
            >
              {message}
            </p>
            <div className="profile__buttons">
              <button
                className={`profile__btn ${
                  (!isFormValid || isLoading) && "profile__btn_type_disabled"
                }`}
                type="submit"
                isFormValid={isFormValid}
                isLoading={isLoading}
              >
                {isLoading ? "Сохраняем..." : "Редактировать"}
              </button>
              <button
                className="profile__btn profile__btn_type_red"
                onClick={signOut}
                type="button"
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  </>
  );
};

export default Profile;