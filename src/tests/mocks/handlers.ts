import { CAT_API, DOG_API, FOX_API } from "@/config";
import { rest } from "msw";

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
    return res(
      ctx.json({
        image: "test-url-fox",
        link: "https://randomfox.ca/?i=111",
      }),
    );
  }),
  rest.get(`${CAT_API}images/search`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "rs",
          url: "test-url-cat",
          width: 480,
          height: 640,
        },
        {
          id: "27l",
          url: "test-url-cat",
          width: 680,
          height: 455,
        },
      ]),
    );
  }),
  rest.get(`${DOG_API}images/search`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "2do",
          url: "test-url-cat",
          width: 500,
          height: 395,
        },
        {
          id: "4d8",
          url: "test-url-cat",
          width: 490,
          height: 245,
        },
      ]),
    );
  }),
  rest.get("/api/photos", (req, res, ctx) => {
    return res(
      ctx.json([
        { type: "fox", url: "test-url-fox" },
        { type: "cat", url: "test-url-cat" },
        { type: "cat", url: "test-url-cat" },
        { type: "cat", url: "test-url-cat" },
        { type: "cat", url: "test-url-cat" },
        { type: "cat", url: "test-url-cat" },
        { type: "cat", url: "test-url-cat" },
        {
          type: "cat",
          url: "test-url-cat",
        },
        {
          type: "cat",
          url: "test-url-cat",
        },
        { type: "cat", url: "test-url-cat.jpg" },
        { type: "cat", url: "test-url-cat" },
        {
          type: "dog",
          url: "test-url-dog",
        },
        {
          type: "dog",
          url: "test-url-dog",
        },
        { type: "dog", url: "test-url-dog" },
        { type: "dog", url: "test-url-dog" },
        { type: "dog", url: "test-url-dog" },
        { type: "dog", url: "test-url-dog.jpg" },
        { type: "dog", url: "test-url-dog" },
        { type: "dog", url: "test-url-dog.jpg" },
        { type: "dog", url: "test-url-dog.jpg" },
        { type: "dog", url: "test-url-dog" },
      ]),
    );
  }),
];
