import { gameStore } from "./game-store";

describe("GameStore", () => {
  it("should handle change status if name is valid", () => {
    gameStore.changeStatus("running-game");
    expect(gameStore.getState().status).toBe("setup-form");

    gameStore.setName("mohammad");
    gameStore.changeStatus("running-game");
    expect(gameStore.getState().status).toBe("running-game");
  });
});
