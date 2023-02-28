import { gameStore } from "@/client/stores";
import { act, renderComponent } from "@/client/tests/render-component";
import { Game } from "./game";

describe("Game", () => {
  it("should show confirmation when exiting the page if game is running", () => {
    const onbeforeunloadSpy = vi.spyOn(window, "onbeforeunload", "set");

    const { unmount } = renderComponent(<Game />);

    act(() => {
      gameStore.setName("test");
      gameStore.changeStatus("playing");
    });

    expect(onbeforeunloadSpy).toHaveBeenCalledTimes(1);

    // now we should remove the confirmation
    act(() => {
      unmount();
    });

    expect(onbeforeunloadSpy).toHaveBeenCalledTimes(2);
  });
});
