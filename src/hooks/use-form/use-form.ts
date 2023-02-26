import { useState } from "react";
import type {
  FormErrors,
  FormInitial,
  FormValidations,
  FormValues,
} from "./types";

const runValidations = (
  values: FormValues = {},
  validations: FormValidations = {},
) => {
  const errors: FormErrors = {};

  for (const key in validations) {
    const fieldValidations = validations[key];

    fieldValidations.forEach((validationFn) => {
      if (errors[key]) {
        return;
      }

      const { isValid, message } = validationFn(values[key]);

      if (!isValid) {
        errors[key] = message;
      }
    });
  }

  return errors;
};

const useForm = ({
  values = {},
  validations = {},
  onSubmit = () => {
    //
  },
}: FormInitial) => {
  const [form, setForm] = useState<{
    values: FormInitial["values"];
    errors: FormErrors;
  }>({ values, errors: {} });

  const setErrors = (errors = {}) => {
    setForm((currentForm) => {
      return {
        ...currentForm,
        errors,
      };
    });
  };

  const setValues = (values = {}) => {
    setForm((currentForm) => {
      return {
        ...currentForm,
        values: {
          ...currentForm.values,
          ...values,
        },
      };
    });
  };

  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setValues({
      [name]: value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = runValidations(form.values, validations);

    setErrors(errors);

    const errorsLength = Object.keys(errors).length;

    if (errorsLength > 0) {
      return;
    }

    if (typeof onSubmit === "function") {
      onSubmit({ form, setForm });
    }
  };

  return {
    values: form.values,
    errors: form.errors,
    handleOnInput,
    handleOnSubmit,
    setValues,
    setErrors,
  };
};

export { useForm };
