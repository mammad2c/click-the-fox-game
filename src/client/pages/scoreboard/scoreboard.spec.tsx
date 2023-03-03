import { scoreboardStore } from "@/client/stores";
import { act, renderComponent, screen } from "@/tests/render-component";
import { Scoreboard } from "./scoreboard";

describe("Scoreboard", () => {
  it("should display the scoreboard inside the table", () => {
    act(() => {
      scoreboardStore.addNewRecord({
        name: "Mohammad",
        score: 2,
        date: new Date().toDateString(),
      });
      scoreboardStore.addNewRecord({
        name: "Jack",
        score: 5,
        date: new Date().toDateString(),
      });
    });

    renderComponent(<Scoreboard />);

    expect(screen.getByText(/rank/i)).toBeTruthy();
    expect(screen.getByText(/name/i)).toBeTruthy();
    expect(screen.getByText(/date/i)).toBeTruthy();
    expect(screen.getByText("Score")).toBeTruthy();
    expect(screen.getByText(/Mohammad/i)).toBeTruthy();
  });
});
