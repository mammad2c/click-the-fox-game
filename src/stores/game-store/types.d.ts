export type GameStatus = "setup-form" | "running-game";

export interface GameStoreState {
  status: GameStatus;
  name: string;
}
