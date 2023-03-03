import { winnerTypes } from "@/config";
import {
  act,
  renderComponent,
  screen,
  userEvent,
  waitFor,
} from "@/tests/render-component";
import { GameScene } from "./game-scene";

describe("GameScene", () => {
  it("should render at least one winner image", async () => {
    renderComponent(<GameScene />);

    // if we don't have a winner situation, then why we should play the game? :)
    expect(winnerTypes.length).toBeGreaterThan(0);

    await waitFor(() => {
      const isWinnerTypeExist = winnerTypes.some((winnerType) => {
        return screen.queryAllByLabelText(winnerType)[0];
      });

      expect(isWinnerTypeExist).toBe(true);
    });
  });

  it("should calculate score based on the image clicks", async () => {
    const { container } = renderComponent(<GameScene />);

    await waitFor(async () => {
      expect(screen.getAllByRole("img")[0]).toBeTruthy();
    });

    // we should increase the score by clicking on a winner type
    const existedWinnerTypeInDocument = winnerTypes.find((winnerType) => {
      return screen.queryAllByLabelText(winnerType)[0];
    }) as string;

    const winnerElement = screen.getByLabelText(existedWinnerTypeInDocument);

    // we should increase score if we click on winner element
    await userEvent.click(winnerElement);

    expect(screen.getByText(/score:/i)).toHaveTextContent(/1/i);

    await userEvent.click(winnerElement);
    expect(screen.getByText(/score:/i)).toHaveTextContent(/2/i);

    // now we should decrease the score
    const otherElements = container.querySelectorAll(
      ".game-scene-images-wrapper [role='img']",
    );

    let foundOtherElement = null;

    for (const otherElement of otherElements) {
      if (!foundOtherElement) {
        const isNotWinner = winnerTypes.every(
          (winnerType) =>
            otherElement.getAttribute("aria-label") !== winnerType,
        );

        if (isNotWinner) {
          foundOtherElement = otherElement;
        }
      }
    }

    // if we don't have not winner element, then why we should play? :)
    expect(foundOtherElement).toBeTruthy();

    await userEvent.click(foundOtherElement as Element);

    expect(screen.getByText(/score:/i)).toHaveTextContent(/1/i);
  });
});
