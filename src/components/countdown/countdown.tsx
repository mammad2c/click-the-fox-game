import { Box } from "@/ui";
import { useCountdownController } from "./controller";
import type { CountdownProps } from "./types";

const Countdown = (props: CountdownProps) => {
  const { generateFormattedTime } = useCountdownController(props);

  const formattedTime = generateFormattedTime();

  return <Box as="span">{formattedTime}</Box>;
};

export { Countdown };
