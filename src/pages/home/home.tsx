import { Box, Button, Text } from "@/ui";

const Home = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Text fontSize="4xl" as="h1" mb={8}>
        Click the FOX!
      </Text>
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
        <Box>
          <Button
            variant="outline"
            minWidth={{
              base: "100%",
              sm: "25%",
            }}
            mb={4}
          >
            Start game
          </Button>
        </Box>

        <Box>
          <Button
            variant="outline"
            minWidth={{
              base: "100%",
              sm: "25%",
            }}
          >
            Scoreboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Home };
