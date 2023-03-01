import { Countdown } from "@/client/components";
import { Box } from "@/client/ui";
import { Container, SimpleGrid } from "@/client/ui";
import { useGameSceneController } from "./controller";

const GameScene = () => {
  const { selectablePhotos, isReady, score, calculateScore } =
    useGameSceneController();

  return (
    <Box maxW={1000} padding="16px">
      <Container display="flex" justifyContent="center" mb={4}>
        <Countdown duration={30} canStart={isReady} />
        <Box mx={4}>|</Box>
        <Box>Score: {score}</Box>
      </Container>

      <SimpleGrid columns={3} spacing={5} className="game-scene-images-wrapper">
        {selectablePhotos.map(({ type, url }) => (
          <Box textAlign="center" key={`${type}-${url}`}>
            <Box
              src={url}
              margin="0 auto"
              alt={type}
              as="img"
              width={200}
              height={200}
              role="button"
              onClick={() => calculateScore(type)}
            ></Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export { GameScene };
