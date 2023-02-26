import { renderComponent, screen } from "@/tests/render-component";
import { Button } from ".";

describe("Button", () => {
  it("should render react-router NavLink if to props is set", () => {
    renderComponent(<Button to="/">test button</Button>);

    const btn = screen.getByText(/test button/i);

    expect(btn).toHaveAttribute("href");
    expect(btn).toHaveClass("active");
  });
});
