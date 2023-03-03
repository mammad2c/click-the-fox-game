import request from "supertest";
import { app } from "../../../server/app";
import mock from "mock-fs";
import { photosPath } from "../../../config";

mock({
  [photosPath]: {
    "fox-mock-photo.jpg": "test",
    "cat-mock-photo.jpg": "test",
    "dog-mock-photo.jpg": "test",
  },
});

vi.mock("sharp", () => {
  return {
    default() {
      return {
        resize: vi.fn().mockReturnThis(),
        toFormat: vi.fn().mockReturnThis(),
        toFile: async () => {
          return vi.fn().mockReturnThis();
        },
      };
    },
  };
});

vi.mock("spritesmith", () => {
  return {
    default: {
      run(
        params: { src: string[] },
        callback: (arg1: unknown, arg2: unknown) => void,
      ) {
        const buff = Buffer.from("test");

        const coordinates: {
          [key: string]: {
            x: number;
            y: number;
            width: number;
            height: number;
          };
        } = {};

        for (let i = 0; i < params.src.length; i++) {
          const photoUrl = params.src[i];
          coordinates[photoUrl] = {
            x: 0,
            y: 0,
            width: 200,
            height: 200,
          };
        }

        callback(null, {
          coordinates,
          properties: {},
          image: buff,
        });
      },
    },
  };
});

describe("GET /api/photos", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mock.restore();
  });

  it("should return image and coordinates", async () => {
    const response = await request(app).get("/api/photos");

    expect(response.body.coordinates).toBeTruthy();

    const { coordinates, imageSpriteFileName } = response.body;

    expect(coordinates[0].x).toBe(0);
    expect(coordinates[0].y).toBe(0);
    expect(coordinates[0].width).toBe(200);
    expect(coordinates[0].height).toBe(200);

    expect(imageSpriteFileName).toBeTruthy();
  });
});
