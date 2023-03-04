import { scoreboardStore, ScoreboardState } from "@/client/stores";
import { useEffect, useState } from "react";

const useScoreboardController = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const table = scoreboardStore.useSelector<ScoreboardState["table"]>(
    (state) => state.table,
  );

  const headers = [
    {
      title: "Rank",
      value: "item-index",
    },
    {
      title: "Name",
      value: "name",
    },
    {
      title: "Date",
      value: "date",
    },
    {
      title: "Score",
      value: "score",
    },
  ];

  return { table, headers, mounted, clearTable: scoreboardStore.clearTable };
};

export { useScoreboardController };
