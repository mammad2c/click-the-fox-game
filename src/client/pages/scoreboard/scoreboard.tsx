import { Box, Button, Container, Table, Text } from "@/client/ui";
import { useScoreboardController } from "./controller";

const Scoreboard = () => {
  const { table, headers, mounted, clearTable } = useScoreboardController();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
      width="100%"
    >
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
          <Button
            mx={2}
            backgroundColor="red"
            onClick={clearTable}
            color="white"
            _hover={{ color: "black", opacity: 0.7 }}
          >
            Clear the table
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export { Scoreboard };
