import { isEmptyString } from "@/helpers";
import { createStore } from "@/services";
import type { GameStatus, GameStoreState } from "./types";

const initialState: GameStoreState = {
  status: "setup-form",
  name: "",
};

const rawGameStore = createStore(initialState);

const changeStatus = (newStatus: GameStatus) => {
  const { name, status } = rawGameStore.getState();
  const isInvalidName = isEmptyString(name);

  if (status === "setup-form" && isInvalidName) {
    return;
  }

  rawGameStore.setState((currentState) => {
    return {
      ...currentState,
      status: newStatus,
    };
  });
};

const setName = (name: GameStoreState["name"]) => {
  rawGameStore.setState((currentState) => {
    return {
      ...currentState,
      name,
    };
  });
};

const gameStore = {
  ...rawGameStore,
  changeStatus,
  setName,
};

export { gameStore };
