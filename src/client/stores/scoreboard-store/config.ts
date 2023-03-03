import orderBy from "lodash.orderby";
import { ScoreboardState } from "./types";

export const tableLocalStorageKey = "scoreboardTable";

export const initialState: ScoreboardState = {
  table: orderBy(
    JSON.parse(
      typeof localStorage !== "undefined"
        ? localStorage.getItem(tableLocalStorageKey) || "[]"
        : "[]",
    ),
    ["score"],
    "desc",
  ),
};
