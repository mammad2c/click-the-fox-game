import { renderComponent } from "@/client/tests/render-component";
import { GameScene } from "./game-scene";

describe("GameScene", () => {
  it("should render properly", () => {
    renderComponent(<GameScene />);
  });
});
