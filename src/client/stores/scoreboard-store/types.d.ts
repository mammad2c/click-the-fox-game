export interface ScoreboardTableItem {
  name: string;
  score: number;
  date: string;
  id?: string;
}

export interface ScoreboardState {
  table: ScoreboardTableItem[];
}
