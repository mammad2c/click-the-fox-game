/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationFunction = (value: unknown) => {
  isValid: boolean;
  message: string;
};

export type FormValues = Record<string, any>;

export type FormErrors<Values = FormValues> = {
  [K in keyof Values]?: string;
};

export type FormValidations = Record<string, ValidationFunction[]>;

export type FormConfig<Values extends FormValues = FormValues> = {
  values: Values;
  validations?: FormValidations;
  onSubmit: ({
    form,
    setForm,
  }: {
    form: Omit<FormConfig<Values>, "onSubmit" | "validations">;
    setForm: React.Dispatch<
      React.SetStateAction<{
        values: Values;
        errors: FormErrors;
      }>
    >;
  }) => void;
};
