import { isEmptyString } from "./is-empty-string";

describe("isEmptyString", () => {
  it("should validate the passed string is empty or not", () => {
    expect(isEmptyString(null)).toBe(true);
    expect(isEmptyString(undefined)).toBe(true);
    expect(isEmptyString("")).toBe(true);
    expect(isEmptyString("    ")).toBe(true);
    expect(isEmptyString("    1")).toBe(false);
    expect(isEmptyString()).toBe(true);
  });
});
