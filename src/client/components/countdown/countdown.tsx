import { Box } from "@/client/ui";
import { defaultCountdownPropsValue } from "./config";
import { useCountdownController } from "./controller";
import type { CountdownProps } from "./types";

const Countdown = (props: CountdownProps = defaultCountdownPropsValue) => {
  const { generateFormattedTime } = useCountdownController(props);

  const formattedTime = generateFormattedTime();

  return <Box as="span">{formattedTime}</Box>;
};

export { Countdown };
