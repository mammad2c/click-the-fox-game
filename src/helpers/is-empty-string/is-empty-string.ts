const isEmptyString = (value?: string | null): boolean => {
  return (
    typeof value === "undefined" ||
    !value ||
    value.length === 0 ||
    !/[^\s]/.test(value) ||
    /^\s*$/.test(value) ||
    value.replace(/\s/g, "") === ""
  );
};

export { isEmptyString };
