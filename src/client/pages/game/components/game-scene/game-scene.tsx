import { Countdown } from "@/client/components";
import { Box } from "@/client/ui";
import { Container, SimpleGrid } from "@/client/ui";
import { useGameSceneController } from "./controller";

const GameScene = () => {
  const { currentFile, currentCoordinates, isReady, score, calculateScore } =
    useGameSceneController();

  return (
    <Box maxW={1000} padding="16px">
      <Container display="flex" justifyContent="center" mb={4}>
        <Countdown duration={30} canStart={isReady} />
        <Box mx={4}>|</Box>
        <Box>Score: {score}</Box>
      </Container>

      {currentCoordinates && currentFile && (
        <SimpleGrid
          columns={3}
          spacing={5}
          className="game-scene-images-wrapper"
        >
          {currentCoordinates.map(({ id, x, y, height, type, width }) => (
            <Box textAlign="center" key={id}>
              <Box
                margin="0 auto"
                width={width}
                height={height}
                role="img"
                aria-label={type}
                style={{
                  background: `-${x}px -${y}px url(${currentFile})`,
                }}
                onClick={() => calculateScore(type)}
              ></Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export { GameScene };
