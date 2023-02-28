import { renderComponent, screen } from "@/client/tests/render-component";
import { FormInput } from "./form-input";

describe("FormInput", () => {
  it("should show or hide error message", () => {
    const { rerender } = renderComponent(
      <FormInput hasError errorMessage="This field is required" />,
    );

    // error should be displayed
    expect(screen.getByText(/this field is required/i)).toBeTruthy();

    // error should be disappeared
    rerender(<FormInput />);
    expect(screen.queryByText(/this field is required/i)).not.toBeTruthy();
  });
});
