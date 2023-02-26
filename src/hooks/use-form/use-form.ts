import { useState } from "react";
import type {
  FormErrors,
  FormInitial,
  FormValidations,
  FormValues,
} from "./types";

const runValidations = (values: FormValues, validations: FormValidations) => {
  const errors: FormErrors = {};

  Object.keys(validations).forEach((key) => {
    const fieldValidations = validations[key];

    fieldValidations.forEach((validationFn) => {
      if (errors[key]) {
        return;
      }

      const result = validationFn(values[key]);

      if (!result.isValid) {
        errors[key] = result.message;
      }
    });
  });

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

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm((currentForm) => {
      return {
        ...currentForm,
        values: {
          ...currentForm.values,
          [name]: value,
        },
      };
    });
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    handleInputChange,
    handleSubmit,
    setValues,
  };
};

export { useForm };
