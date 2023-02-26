import { CountdownProps } from "./types";

const useCountdownController = ({ time }: CountdownProps) => {
  const generateFormattedTime = () => {
    if (!time || time < 0) {
      return "00:00:00";
    }

    let totalSeconds = time;

    let hours: string | number = Math.floor(totalSeconds / 3600);
    hours = hours < 9 ? `0${hours}` : hours;

    totalSeconds %= 3600;

    let minutes: string | number = Math.floor(totalSeconds / 60);
    minutes = minutes < 9 ? `0${minutes}` : minutes;

    let seconds: string | number = totalSeconds % 60;
    seconds = seconds < 9 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  };

  return { generateFormattedTime };
};

export { useCountdownController };
