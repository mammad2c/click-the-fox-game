import { padTo2Digits } from "./pad-to-2-digits";

describe("padTo2Digits", () => {
  it("should return 2 characters number format", () => {
    const result1 = padTo2Digits(0);
    const result2 = padTo2Digits("08");
    const result3 = padTo2Digits(4);
    const result4 = padTo2Digits(23);

    expect(result1).toBe("00");
    expect(result2).toBe("08");
    expect(result3).toBe("04");
    expect(result4).toBe("23");
  });
});
