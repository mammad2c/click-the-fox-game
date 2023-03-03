import { Box, Button, Container, Table, Text } from "@/client/ui";
import { useScoreboardController } from "./controller";

const Scoreboard = () => {
  const { table, headers, mounted } = useScoreboardController();

  return (
    <Container py={8} maxW="container.lg">
      <Text textAlign="center" as="h2" fontSize="4xl" mb={4}>
        Scoreboard
      </Text>
      {mounted && <Table headers={headers} items={table} />}
      <Box display="flex" justifyContent="center" my={4}>
        <Button mx={2} to="/">
          To Welcome Screen
        </Button>
        <Button mx={2} to="/game">
          Play
        </Button>
      </Box>
    </Container>
  );
};

export { Scoreboard };
