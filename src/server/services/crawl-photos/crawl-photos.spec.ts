import { crawlPhotos } from "./crawl-photos";

describe("crawlPhotos", () => {
  it("should fetch photos correctly", async () => {
    const photos = await crawlPhotos(3);
    expect(photos.length).toBe(9);
    expect(photos[0].type).toBeTruthy();
    expect(photos[0].url).toBeTruthy();
  });
});
