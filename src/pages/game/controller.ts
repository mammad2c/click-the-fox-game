import { gameStore } from "@/stores";
import { useEffect, useRef } from "react";

const useGameController = () => {
  const { status } = gameStore.useSelector();
  const beforeunloadFlag = useRef(false);

  useEffect(() => {
    if (status === "playing" && !beforeunloadFlag.current) {
      window.onbeforeunload = () => {
        return "You are now running the game, are you sure to leave?";
      };
      beforeunloadFlag.current = true;
    }

    return () => {
      if (status === "playing") {
        window.onbeforeunload = null;
        gameStore.changeStatus("initial-setup");
      }
    };
  }, [status]);

  return { status };
};

export { useGameController };
