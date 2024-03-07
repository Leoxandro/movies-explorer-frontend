import React, { useContext } from "react";
import "./Register.css";
import Form from "../Form/Form";
import FormInput from "../FormInput/FormInput";
import { CurrentUserContext } from "../../providers/CurrentUserContext";
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register() {
  const { apiErrMsg, handleSignUp, setApiErrMsg } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation({ email: '', name: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignUp(values)
      .then(() => resetForm())
      .catch((err) => {
        console.log(err);
        setApiErrMsg(err.message);
      });
  };
  
  return (
    <main className="register">
      <Form
        handleSubmit={handleSubmit}
        disabled={!isValid}
        greeting="Добро пожаловать!"
        buttonText="Sign Up"
        question="Уже зарегистрированы?"
        link="/signin"
        linkName="Войти"
        error={apiErrMsg}
      >
        <FormInput
          name="name"
          title="Имя"
          type="text"
          placeholder="Введите имя пользователя"
          required={true}
          minLength="3"
          maxLength="30"
          value={values.name || ''}
          onChange={handleChange}
          error={errors.name || ''}
        />
        <FormInput
          name="email"
          title="E-mail"
          type="email"
          placeholder="Введите email"
          required={true}
          value={values.email || ''}
          onChange={handleChange}
          error={errors.email || ''}
        />
        <FormInput
          name="password"
          title="Пароль"
          type="password"
          placeholder="Введите пароль"
          required={true}
          minLength="8"
          value={values.password || ''}
          onChange={handleChange}
          error={errors.password || ''}
        />
      </Form>
    </main>
  );
}

export default Register;
