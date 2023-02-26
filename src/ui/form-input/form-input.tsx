import {
  FormControl as UIFormControl,
  FormLabel as UIFormLabel,
  Input as UIInput,
  FormErrorMessage as UIFormErrorMessage,
  InputProps as UIInputProps,
} from "@chakra-ui/react";

interface FormInputProps extends UIInputProps {
  errorMessage?: string;
  hasError?: boolean;
  label?: string;
  isRequired?: boolean;
}

const FormInput = ({
  label,
  hasError,
  errorMessage,
  isRequired,
  ...restProps
}: FormInputProps) => {
  return (
    <UIFormControl label={label} isRequired={isRequired} isInvalid={hasError}>
      {label && <UIFormLabel>{label}</UIFormLabel>}

      <UIInput {...restProps} />

      {hasError && errorMessage && (
        <UIFormErrorMessage>{errorMessage}</UIFormErrorMessage>
      )}
    </UIFormControl>
  );
};

export { FormInput };
