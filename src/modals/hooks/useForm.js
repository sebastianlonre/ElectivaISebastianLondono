import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, validations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const value of Object.values(formValidation)) {
      if (value !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const checkedValues = {};
    for (const field of Object.keys(validations)) {
      const [fn, errorMessage] = validations[field];
      checkedValues[`${field}Valid`] = fn(formState[field]) ? null : errorMessage;
    }
    setFormValidation(checkedValues);
  };

  return {
    ...formState,
    onInputChange,
    resetForm,
    isFormValid,
    ...formValidation
  };
};
