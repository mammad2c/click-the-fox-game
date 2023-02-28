import { Box } from "@/client/ui";
import { GameScene, SetupGameForm } from "./components";
import { useGameController } from "./controller";

const Game = () => {
  const { status } = useGameController();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Box
        border="2px"
        rounded={4}
        width={{
          base: "100%",
          sm: 300,
        }}
        padding={8}
        textAlign="center"
      >
        {status === "initial-setup" && <SetupGameForm />}
        {status === "playing" && <GameScene />}
      </Box>
    </Box>
  );
};

export { Game };
