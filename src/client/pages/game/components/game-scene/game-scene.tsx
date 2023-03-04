import { Countdown } from "@/client/components";
import { Box } from "@/client/ui";
import { Container, SimpleGrid, Button, Progress } from "@/client/ui";
import { motion } from "framer-motion";
import { gameDuration } from "./config";
import { useGameSceneController } from "./controller";

const GameScene = () => {
  const {
    currentFileName,
    currentCoordinates,
    canGameGetStarted,
    score,
    progress,
    showTheProgressBar,
    showThePlayButton,
    handleClickOnPlayButton,
    calculateScore,
  } = useGameSceneController();

  if (showTheProgressBar) {
    return (
      <Box>
        <Progress
          value={progress}
          size="lg"
          rounded="full"
          max={95}
          colorScheme="yellow"
        />
        {progress <= 20 && <Box>Preparing the game</Box>}
        {progress > 20 && progress < 75 && <Box>Loading resources</Box>}
        {progress >= 75 && <Box>Almost done! be ready to start</Box>}
      </Box>
    );
  }

  if (showThePlayButton) {
    return (
      <Box>
        <Button onClick={handleClickOnPlayButton}>Start the game</Button>
      </Box>
    );
  }

  return (
    <Box maxW={1000} padding="16px">
      <Container display="flex" justifyContent="center" mb={4} fontSize="2xl">
        <Box>
          <Box as="span" display="inline-block" mr={2}>
            Time left:
          </Box>
          <Countdown duration={gameDuration} canStart={canGameGetStarted} />
        </Box>
        <Box mx={4}>|</Box>
        <Box>
          Score:
          <Box as="span" width={40} textAlign="center" ml={2}>
            {score}
          </Box>
        </Box>
      </Container>

      {canGameGetStarted && (
        <SimpleGrid
          columns={3}
          spacing={8}
          className="game-scene-images-wrapper"
        >
          {currentCoordinates?.map(({ id, x, y, height, type, width }) => (
            <Box
              as={motion.div}
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition="0.3s ease"
              key={id}
              margin="0 auto"
              width={width}
              height={height}
              role="img"
              aria-label={type}
              cursor="pointer"
              rounded="md"
              border="2px solid black"
              whileHover={{
                scale: 1.1,
              }}
              style={{
                background: `-${x}px -${y}px url(${currentFileName})`,
              }}
              onClick={() => calculateScore(type)}
            ></Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export { GameScene };
