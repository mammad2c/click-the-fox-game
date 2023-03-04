const padTo2Digits = (num: number | string): string => {
  return String(num).padStart(2, "0");
};

export { padTo2Digits };
