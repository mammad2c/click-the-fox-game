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

    let hours: string | number = Math.floor(totalSeconds / 3600);
    hours = `${hours}`.padStart(2, "0");

    totalSeconds %= 3600;

    let minutes: string | number = Math.floor(totalSeconds / 60);
    minutes = `${minutes}`.padStart(2, "0");

    let seconds: string | number = totalSeconds % 60;
    seconds = `${seconds}`.padStart(2, "0");

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
