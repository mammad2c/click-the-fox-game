import { gameStore } from "@/stores";
import { useEffect, useRef } from "react";

const useGameController = () => {
  const { status } = gameStore.useSelector();
  const beforeunloadFlag = useRef(false);

  useEffect(() => {
    if (status === "running-game" && !beforeunloadFlag.current) {
      window.onbeforeunload = () => {
        return "You are now running the game, are you sure to leave?";
      };
      beforeunloadFlag.current = true;
    }

    return () => {
      if (status === "running-game") {
        window.onbeforeunload = null;
        gameStore.changeStatus("setup-form");
      }
    };
  }, [status]);

  return { status };
};

export { useGameController };
