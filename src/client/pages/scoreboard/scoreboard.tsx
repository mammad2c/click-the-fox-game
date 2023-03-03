import { Container, Table, Text } from "@/client/ui";
import { useScoreboardController } from "./controller";

const Scoreboard = () => {
  const { table, headers } = useScoreboardController();

  return (
    <Container py={8} maxW="container.lg">
      <Text textAlign="center" as="h2" fontSize="4xl" mb={4}>
        Scoreboard
      </Text>
      <Table headers={headers} items={table} />
    </Container>
  );
};

export { Scoreboard };
