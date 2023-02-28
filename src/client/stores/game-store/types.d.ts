export type GameStatus = "initial-setup" | "playing";

export interface GameStoreState {
  status: GameStatus;
  name: string;
}
