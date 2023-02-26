import { gameStore } from "@/stores";
import { useEffect } from "react";

const useGameController = () => {
  const { status } = gameStore.useSelector();

  useEffect(() => {
    return () => {
      if (status === "running-game") {
        window.onbeforeunload = function () {
          return "You are now running the game, are you sure?";
        };

        gameStore.changeStatus("setup-form");
      }
    };
  }, [status]);

  return { status };
};

export { useGameController };
