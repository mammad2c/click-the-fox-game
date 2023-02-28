# useForm

We use this hook to manage a form.

# Arguments

- `values`: The values of the form. It should be an object.
- `validations`: For each value that exists inside the `values` object, you can define the validation. Validation should be an array of functions. There are some `validations` already defined inside the `validations.ts`. You can write your own validation. Also validations could be anywhere else.
- `onSubmit`: The callback to be called when the form is submitted. This function will not be called when the form is not valid.

## Write your own validation

A custom validation function can be provided like this:

**Arguments:**

`value`: The value to be validated.

**Return Value:**

Return should be an object with the following structure:

```
  {
    isValid: boolean; // determine whether the value is valid or not.
    message: string; // the message to be displayed when the value is not valid.
  };
```
