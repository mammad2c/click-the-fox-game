import { createStore } from "@/client/services";
import { initialState } from "./config";
import orderBy from "lodash.orderby";
import { ScoreboardTableItem } from "./types";
import { uuid4 } from "@/shared";
import { padTo2Digits } from "@/shared/pad-to-2-digits/pad-to-2-digits";

const rawScoreboardStore = createStore(initialState);

rawScoreboardStore.subscribe((state) => {
  localStorage.setItem("scoreboardTable", JSON.stringify(state.table));
});

const addNewRecord = (newRecord: ScoreboardTableItem) => {
  const { table } = rawScoreboardStore.getState();

  const newDate = new Date();

  const hours = padTo2Digits(newDate.getHours());
  const minutes = padTo2Digits(newDate.getMinutes());
  const seconds = padTo2Digits(newDate.getSeconds());

  const date = `${newDate.toDateString()} - ${hours}:${minutes}:${seconds}`;

  const newTable = orderBy(
    [
      ...table,
      {
        ...newRecord,
        id: uuid4(),
        date,
      },
    ],
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

const clearTable = () => {
  rawScoreboardStore.setState((currentState) => {
    return {
      ...currentState,
      table: [],
    };
  });
};

const scoreboardStore = { ...rawScoreboardStore, addNewRecord, clearTable };

export { scoreboardStore };
