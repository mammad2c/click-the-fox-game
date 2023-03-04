import { Box, Text } from "@/client/ui";
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
      width="100%"
    >
      <Text fontSize="4xl" as="h1" mb={status !== "playing" ? 8 : 0}>
        Click the FOX!
      </Text>
      {status === "initial-setup" && (
        <Box border="2px" rounded={4} padding={8} textAlign="center">
          <SetupGameForm />
        </Box>
      )}
      {status === "playing" && <GameScene />}
    </Box>
  );
};

export { Game };
