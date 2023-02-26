import { gameStore } from "@/stores";

const useGameController = () => {
  const { status } = gameStore.useSelector();

  return { status };
};

export { useGameController };
