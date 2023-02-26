import { isEmptyString } from "@/helpers";
import type { ValidationFunction } from "./types";

export const required: ValidationFunction = (value) => {
  const isValid = !isEmptyString(value as string);

  return {
    isValid,
    message: isValid ? "" : "This field is required",
  };
};

export const number: ValidationFunction = (value) => {
  const isValid =
    !isEmptyString(value as string) && !Number.isNaN(Number(value));

  return {
    isValid,
    message: isValid ? "" : "This field should be a number",
  };
};
