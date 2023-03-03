import { CAT_API, DOG_API, FOX_API } from "@/config";
import { uuid4 } from "@/shared";
import { rest } from "msw";
import type {
  ImageSpriteResponseObj,
  SingleResourceCatOrDog,
} from "@/server/services";

const mockPhotoUrl = "http://www.example.com/images/mock-photo.jpg";

const animalsData = [
  { type: "fox", url: mockPhotoUrl },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "cat",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
  {
    type: "dog",
    url: mockPhotoUrl,
  },
];

const photosResponse: ImageSpriteResponseObj = {
  coordinates: animalsData.slice(0, 8).map((item) => {
    return {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      type: item.type,
      id: uuid4(),
    };
  }),
  imageSpriteFileName: "/photos/test.jpg",
};

const generateCatOrDogResponse = (type: string) => {
  return animalsData.reduce<SingleResourceCatOrDog[]>((acc, current) => {
    if (current.type === type) {
      return [
        ...acc,
        {
          id: uuid4(),
          url: current.url,
          width: 480,
          height: 640,
        },
      ];
    }

    return acc;
  }, []);
};

export const handlers = [
  rest.get("fake-test", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          fake: "test",
        },
      }),
    );
  }),
  rest.get(FOX_API, (req, res, ctx) => {
    const fox = animalsData.find((item) => item.type === "fox");

    return res(
      ctx.json({
        image: fox?.url,
        link: fox?.url,
      }),
    );
  }),
  rest.get(`${CAT_API}images/search`, (req, res, ctx) => {
    return res(ctx.json(generateCatOrDogResponse("cat")));
  }),
  rest.get(`${DOG_API}images/search`, (req, res, ctx) => {
    return res(ctx.json(generateCatOrDogResponse("dog")));
  }),
  rest.get("/api/photos", (req, res, ctx) => {
    return res(ctx.json(photosResponse));
  }),
  rest.get(mockPhotoUrl, (req, res, ctx) => {
    return res(ctx.text("test"));
  }),
];
