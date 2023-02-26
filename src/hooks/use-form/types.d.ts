export type ValidationFunction = (value: unknown) => {
  isValid: boolean;
  message: string;
};

export type FormErrors = Record<string, string>;

export type FormValues = Record<
  string,
  string | number | readonly string[] | undefined
>;

export type FormValidations = Record<string, ValidationFunction[]>;

export type FormInitial = {
  values: FormValues;
  validations: FormValidations;
  onSubmit: ({
    form,
    setForm,
  }: {
    form: Omit<InitialForm, "onSubmit" | "validations">;
    setForm: React.Dispatch<
      React.SetStateAction<{
        values: FormValues;
        errors: FormErrors;
      }>
    >;
  }) => void;
};
