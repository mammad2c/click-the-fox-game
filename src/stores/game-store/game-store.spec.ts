import { gameStore } from "./game-store";

describe("GameStore", () => {
  it("should handle change status if name is valid", () => {
    gameStore.changeStatus("playing");
    expect(gameStore.getState().status).toBe("initial-setup");

    gameStore.setName("mohammad");
    gameStore.changeStatus("playing");
    expect(gameStore.getState().status).toBe("playing");
  });
});
