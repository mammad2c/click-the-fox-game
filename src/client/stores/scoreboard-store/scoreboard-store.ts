import { createStore } from "@/client/services";
import { initialState } from "./config";
import orderBy from "lodash.orderby";
import { ScoreboardTableItem } from "./types";
import { uuid4 } from "@/shared";

const rawScoreboardStore = createStore(initialState);

rawScoreboardStore.subscribe((state) => {
  localStorage.setItem("scoreboardTable", JSON.stringify(state.table));
});

const addNewRecord = (newRecord: ScoreboardTableItem) => {
  const { table } = rawScoreboardStore.getState();

  const newTable = orderBy(
    [...table, { ...newRecord, id: uuid4() }],
    ["score"],
    "desc",
  );

  rawScoreboardStore.setState((currentState) => {
    return {
      ...currentState,
      table: newTable,
    };
  });
};

const scoreboardStore = { ...rawScoreboardStore, addNewRecord };

export { scoreboardStore };
