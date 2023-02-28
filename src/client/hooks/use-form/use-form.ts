import { useState } from "react";
import type {
  FormErrors,
  FormConfig,
  FormValidations,
  FormValues,
} from "./types";

const runValidations = (
  values: FormConfig["values"],
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

const useForm = <Values extends FormValues = FormValues>(
  formConfig: FormConfig<Values>,
) => {
  const [form, setForm] = useState<{
    values: Values;
    errors: FormErrors<Values>;
  }>({ values: formConfig.values, errors: {} });

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

    const errors = runValidations(form.values, formConfig.validations);

    setErrors(errors);

    const errorsLength = Object.keys(errors).length;

    if (errorsLength > 0) {
      return;
    }

    if (typeof formConfig.onSubmit === "function") {
      formConfig.onSubmit({ form, setForm });
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
