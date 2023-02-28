import { Box, Button, FormInput } from "@/client/ui";
import { useSetupGameFormController } from "./controller";

const SetupGameForm = () => {
  const { values, errors, handleOnInput, handleOnSubmit } =
    useSetupGameFormController();

  return (
    <Box>
      <form onSubmit={handleOnSubmit}>
        <FormInput
          value={values.name}
          hasError={Boolean(errors.name)}
          errorMessage={errors.name}
          name="name"
          onInput={handleOnInput}
          label="Please enter your name"
        />

        <Button mt={4} type="submit">
          Play
        </Button>
      </form>
    </Box>
  );
};

export { SetupGameForm };
