import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formErrorsState, setFormErrorsState] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const fieldError of Object.values(formErrorsState)) {
      if (fieldError !== null) return false;
    }

    return true;
  }, [formErrorsState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const [fieldName, [validationFn, errorMessage]] of Object.entries(
      formValidations
    )) {
      formCheckedValues[`${fieldName}Error`] = validationFn(
        formState[fieldName]
      )
        ? null
        : errorMessage;
    }

    setFormErrorsState(formCheckedValues);
  };

  return {
    ...formState,
    ...formErrorsState,
    formState,
    isFormValid,
    onInputChange,
    onResetForm,
  };
};
