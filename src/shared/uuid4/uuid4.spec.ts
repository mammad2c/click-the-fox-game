import { uuid4 } from "./uuid4";

const uuid4Regex = RegExp(/^[a-z,0-9,-]{36,36}$/m);

describe("uuid4", () => {
  it("should generate valid uuid v4", () => {
    const result1 = uuid4();
    const result2 = uuid4();
    const result3 = uuid4();
    const result4 = uuid4();

    expect(uuid4Regex.test(result1)).toBe(true);
    expect(uuid4Regex.test(result2)).toBe(true);
    expect(uuid4Regex.test(result3)).toBe(true);
    expect(uuid4Regex.test(result4)).toBe(true);
  });
});
