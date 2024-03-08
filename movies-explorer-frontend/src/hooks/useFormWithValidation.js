import { useState, useCallback, useEffect } from "react";
import { emailRegex, nameRegex } from "../constants/constants";

const useFormWithValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateName = useCallback(
    (value) => {
      if (!nameRegex.test(value)) {
        return "Имя может содержать только буквы, пробелы и дефисы";
      } else if (value.length < 3 || value.length > 30) {
        return "Имя должно состоять из минимум 2-ух символов и не превышать 30-ти";
      } else {
        return "";
      }
    },
    []
  );

  const validateEmail = useCallback(
    (value) => {
      return emailRegex.test(value);
    },
    []
  );

  const validatePassword = useCallback(
    (value) => {
      return value.length >= 8;
    },
    []
  );

  const handleChange = useCallback((event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let validationError = '';
    if (!value) {
      validationError = "Это поле обязательное";
    } else if (name === 'email') {
      validationError = validateEmail(value) ? '' : 'Некорректный email';
    } else if (name === 'name') {
      validationError = validateName(value);
    } else if (name === 'password') {
      validationError = validatePassword(value) ? '' : 'Пароль должен содержать минимум 8 символов';
    }

    setValues({...values, [name]: value });
    setErrors({...errors, [name]: validationError });
  }, [validateEmail, validateName, validatePassword, values, errors]);

  useEffect(() => {
    const noErrors = Object.values(errors).every((error) => error === "");
    const allValuesPresent = Object.values(values).every((value) => {
      return typeof value === 'string' && value.trim() !== "";
    });

    setIsValid(noErrors && allValuesPresent);
  }, [errors, values]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm };
};

export default useFormWithValidation;
