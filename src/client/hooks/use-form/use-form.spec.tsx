import {
  renderComponent,
  screen,
  fireEvent,
} from "@/client/tests/render-component";
import { FormConfig } from "./types";
import { useForm } from "./use-form";
import { number, required } from "./validations";

const form: FormConfig = {
  values: {
    name: "",
    amount: "",
    description: "",
  },
  validations: {
    name: [required],
    amount: [required, number],
  },
  onSubmit: () => {
    //
  },
};

const TestComponent = () => {
  const { values, errors, handleOnInput, handleOnSubmit } = useForm(form);

  return (
    <form onSubmit={handleOnSubmit} data-testid="form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          onInput={handleOnInput}
          value={values.name}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          name="amount"
          onInput={handleOnInput}
          value={values.amount}
        />
        {errors.amount && <span>{errors.amount}</span>}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          onInput={handleOnInput}
          value={values.description}
        />
        {errors.description && <span>{errors.description}</span>}
      </div>

      <div>
        <button type="submit">Submit form</button>
      </div>
    </form>
  );
};

const setup = () => {
  const testHelpers = renderComponent(<TestComponent />);

  const formElement = screen.getByTestId("form");
  const nameInput = screen.getByLabelText(/name/i);
  const amountInput = screen.getByLabelText(/amount/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const submitButton = screen.getByText(/submit form/i);

  return {
    formElement,
    nameInput,
    amountInput,
    descriptionInput,
    submitButton,
    testHelpers,
  };
};

describe("useForm", () => {
  it("should not submit form until it is valid", () => {
    const { submitButton, amountInput, nameInput, descriptionInput } = setup();
    const submitSpy = vi.spyOn(form, "onSubmit");

    // we try to submit with wrong validations
    fireEvent.click(submitButton);

    expect(submitSpy).not.toHaveBeenCalled();
    expect(screen.getAllByText(/This field is required/i)[0]).toBeTruthy();

    // // now try to submit with valid values
    fireEvent.input(nameInput, {
      target: {
        value: "test name",
      },
    });

    fireEvent.input(amountInput, {
      target: {
        value: "2222",
      },
    });

    fireEvent.input(descriptionInput, {
      target: {
        value: "test description",
      },
    });

    fireEvent.click(submitButton);

    expect(submitSpy).toHaveBeenCalled();
    expect(
      screen.queryAllByAltText(/This field is required/i)[0],
    ).not.toBeTruthy();
  });
});
