import { renderComponent } from "@/tests/render-component";
import { MainLayout } from "./main-layout";

describe("MainLayout", () => {
  it("should render properly", () => {
    const { container } = renderComponent(<MainLayout />);

    expect(container.querySelector("main")).toBeTruthy();
  });
});
