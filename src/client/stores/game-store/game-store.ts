import { isEmptyString } from "@/shared";
import { createStore } from "@/client/services";
import type { GameStatus, GameStoreState } from "./types";

const initialState: GameStoreState = {
  status: "initial-setup",
  name: "",
};

const rawGameStore = createStore(initialState);

const changeStatus = (newStatus: GameStatus) => {
  const { name, status } = rawGameStore.getState();
  const isInvalidName = isEmptyString(name);

  if (status === "initial-setup" && isInvalidName) {
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
