import {
  getAnimalFileNameByFilePath,
  getAnimalTypeByFileName,
} from "./helpers";

describe("getAnimalFileNameByFilePath", () => {
  it("should extract the file name from the path");
  const result1 = getAnimalFileNameByFilePath(
    "public/photos/cat-tumblr_lotdkjnhZF1qdvbl3o1_250.jpg",
  );
  const result2 = getAnimalFileNameByFilePath(
    "public/photos/dog-njDSq3gRF.jpg",
  );
  const result3 = getAnimalFileNameByFilePath(
    "public/photos/dog-HyJvcl9N7_390x256.jpg",
  );
  const result4 = getAnimalFileNameByFilePath(
    "public/photos/fox-SJuYFO3HQ_390x256.jpg",
  );

  expect(result1).toBe("cat-tumblr_lotdkjnhZF1qdvbl3o1_250.jpg");
  expect(result2).toBe("dog-njDSq3gRF.jpg");
  expect(result3).toBe("dog-HyJvcl9N7_390x256.jpg");
  expect(result4).toBe("fox-SJuYFO3HQ_390x256.jpg");
});

describe("getAnimalTypeByFileName", () => {
  it("should detect animal type based on file name", () => {
    const result1 = getAnimalTypeByFileName("cat-2432.jpg");
    const result2 = getAnimalTypeByFileName("dog-234.jpg");
    const result3 = getAnimalTypeByFileName("fox-54.jpg");
    const result4 = getAnimalTypeByFileName("dog-34.jpg");

    expect(result1).toBe("cat");
    expect(result2).toBe("dog");
    expect(result3).toBe("fox");
    expect(result4).toBe("dog");
  });
});
