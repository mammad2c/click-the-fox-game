import { scoreboardStore, ScoreboardState } from "@/client/stores";

const useScoreboardController = () => {
  //
  const table = scoreboardStore.useSelector<ScoreboardState["table"]>(
    (state) => state.table,
  );

  const headers = ["Rank", "Name", "Date", "Score"];

  return { table, headers };
};

export { useScoreboardController };
