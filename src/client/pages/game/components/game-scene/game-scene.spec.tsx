import {
  renderComponent,
  screen,
  userEvent,
  waitFor,
} from "@/tests/render-component";
import { winnerTypes } from "./config";
import { GameScene } from "./game-scene";

describe("GameScene", () => {
  it("should render at least one winner image", async () => {
    renderComponent(<GameScene />);

    // if we don't have a winner situation, then why we should play the game? :)
    expect(winnerTypes.length).toBeGreaterThan(0);

    await waitFor(() => {
      const isWinnerTypeExist = winnerTypes.some((winnerType) => {
        return screen.queryAllByAltText(winnerType)[0];
      });

      expect(isWinnerTypeExist).toBe(true);
    });
  });

  it("should calculate score based on the image clicks", async () => {
    const { container } = renderComponent(<GameScene />);

    await waitFor(() => {
      // we should increase the score by clicking on a winner type
      const existedWinnerTypeInDocument = winnerTypes.find((winnerType) => {
        return screen.queryAllByAltText(winnerType)[0];
      }) as string;

      const winnerElement = screen.getByAltText(existedWinnerTypeInDocument);

      // we should increase score if we click on winner element
      userEvent.click(winnerElement);
      expect(screen.getByText(/score:/i)).toHaveTextContent(/1/i);

      userEvent.click(winnerElement);
      expect(screen.getByText(/score:/i)).toHaveTextContent(/2/i);

      // now we should decrease the score
      const otherElements = container.querySelectorAll(
        ".game-scene-images-wrapper img",
      );

      let foundOtherElement = null;

      for (const otherElement of otherElements) {
        if (!foundOtherElement) {
          const isNotWinner = winnerTypes.every(
            (winnerType) => otherElement.getAttribute("alt") !== winnerType,
          );

          if (isNotWinner) {
            foundOtherElement = otherElement;
          }
        }
      }

      // if we don't have not winner element, then why we should play? :)
      expect(foundOtherElement).toBeTruthy();

      userEvent.click(foundOtherElement as Element);

      expect(screen.getByText(/score:/i)).toHaveTextContent(/1/i);
    });
  });
});
