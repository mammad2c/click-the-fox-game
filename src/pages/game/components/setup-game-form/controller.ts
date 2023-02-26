import { useForm, validations } from "@/hooks";
import { gameStore } from "@/stores";

const initialFormValues = {
  name: "",
};

const formValidations = {
  name: [validations.required],
};

const useSetupGameFormController = () => {
  const { values, errors, handleOnInput, handleOnSubmit } = useForm({
    values: initialFormValues,
    validations: formValidations,
    onSubmit: ({ form }) => {
      gameStore.setName(form.values.name);
      gameStore.changeStatus("running-game");
    },
  });

  return {
    values,
    errors,
    handleOnInput,
    handleOnSubmit,
  };
};

export { useSetupGameFormController };
