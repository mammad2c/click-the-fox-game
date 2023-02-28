import { CrawledResponsePhoto, crawlPhotos } from "./crawl-photos";

describe("crawlPhotos", () => {
  it("should fetch photos correctly", async () => {
    const photos = (await crawlPhotos()) as CrawledResponsePhoto[];
    expect(photos[0].url).toBeTruthy();
    expect(photos[0].type).toBeTruthy();
  });
});
