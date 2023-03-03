import { gameStore } from "@/client/stores";
import { winnerTypes } from "@/config";
import {
  renderComponent,
  screen,
  userEvent,
  waitFor,
} from "@/tests/render-component";
import { GameScene } from "./game-scene";

beforeEach(() => {
  gameStore.setName("Mohammad");
  gameStore.changeStatus("playing");
});

describe("GameScene", () => {
  it("should render at least one winner image", async () => {
    vi.useFakeTimers();

    renderComponent(<GameScene />);

    vi.advanceTimersByTime(3000);
    vi.useRealTimers();

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
    vi.useFakeTimers();
    const { container } = renderComponent(<GameScene />);
    vi.advanceTimersByTime(3000);
    vi.useRealTimers();

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

  // TODO: I should complete this test later
  // it.only("should finish the game when countdown reaches end", async () => {
  //   vi.useFakeTimers();

  //   const { debug } = renderComponent(<GameScene />);

  //   act(() => {
  //     vi.advanceTimersByTime(20 * 1000);
  //   });

  //   vi.useRealTimers();

  //   await waitFor(async () => {
  //     expect(screen.getAllByRole("img")[0]).toBeTruthy();
  //   });

  //   act(() => {
  //     vi.useFakeTimers();
  //     vi.advanceTimersByTime(60 * 1000);
  //     // vi.runOnlyPendingTimersAsync();
  //     // vi.setSystemTime(new Date().getTime() + 30 * 1000);
  //     // vi.runAllTicks();
  //   });

  //   // await waitFor(() => {
  //   //   expect(screen.getByText("00:00:00")).toBeTruthy();
  //   // });

  //   debug();

  //   // expect(gameStore.getState().status).toBe("initial-setup");
  //   // expect(window.location.pathname).toBe("scoreboard");
  // });
});
