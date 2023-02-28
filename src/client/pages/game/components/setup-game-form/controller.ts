import { useForm, validations } from "@/client/hooks";
import { gameStore } from "@/client/stores";

const formValidations = {
  name: [validations.required],
};

const useSetupGameFormController = () => {
  const { values, errors, handleOnInput, handleOnSubmit } = useForm({
    values: {
      name: gameStore.getState().name,
    },
    validations: formValidations,
    onSubmit: ({ form }) => {
      gameStore.setName(form.values.name);
      gameStore.changeStatus("playing");
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
