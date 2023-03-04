import { padTo2Digits } from "@/shared/pad-to-2-digits/pad-to-2-digits";
import { useEffect, useRef, useState } from "react";
import { defaultCountdownPropsValue } from "./config";
import type { CountdownProps } from "./types";

const useCountdownController = ({
  duration,
  canStart,
  onFinish,
}: CountdownProps = defaultCountdownPropsValue) => {
  const [remainDuration, setRemainDuration] = useState(duration);
  const countdownIntervalId = useRef<NodeJS.Timer | null>(null);

  const generateFormattedTime = () => {
    if (!remainDuration || remainDuration < 0) {
      return "00:00:00";
    }

    let totalSeconds = remainDuration;

    const hours = padTo2Digits(Math.floor(totalSeconds / 3600));

    totalSeconds %= 3600;

    const minutes = padTo2Digits(Math.floor(totalSeconds / 60));

    const seconds = padTo2Digits(totalSeconds % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  const stopCountdown = () => {
    if (countdownIntervalId.current) {
      clearInterval(countdownIntervalId.current);
    }
  };

  useEffect(() => {
    if (canStart) {
      countdownIntervalId.current = setInterval(() => {
        setRemainDuration((currentRemainTime) => currentRemainTime - 1);
      }, 1000);
    } else {
      stopCountdown();
    }

    return () => {
      stopCountdown();
    };
  }, [canStart]);

  useEffect(() => {
    setRemainDuration(duration);
  }, [duration]);

  useEffect(() => {
    if (remainDuration <= 0 && typeof onFinish === "function") {
      onFinish();
    }
  }, [remainDuration]);

  return { generateFormattedTime };
};

export { useCountdownController };
