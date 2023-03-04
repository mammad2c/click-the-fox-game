import { Countdown } from "@/client/components";
import { Box } from "@/client/ui";
import { Container, SimpleGrid, Button, Progress } from "@/client/ui";
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
    onFinish,
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
          <Countdown
            duration={30}
            canStart={canGameGetStarted}
            onFinish={onFinish}
          />
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
          spacing={5}
          className="game-scene-images-wrapper"
        >
          {currentCoordinates?.map(({ id, x, y, height, type, width }) => (
            <Box textAlign="center" key={id}>
              <Box
                margin="0 auto"
                width={width}
                height={height}
                role="img"
                aria-label={type}
                cursor="pointer"
                style={{
                  background: `-${x}px -${y}px url(${currentFileName})`,
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
