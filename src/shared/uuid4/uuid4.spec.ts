import { uuid4 } from "./uuid4";

// grabbed from https://github.com/uuidjs/uuid/blob/main/src/regex.js
const uuid4Regex =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

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
