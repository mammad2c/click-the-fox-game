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
        image: "https://randomfox.ca/images/111.jpg",
        link: "https://randomfox.ca/?i=111",
      }),
    );
  }),
  rest.get(`${CAT_API}images/search`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "rs",
          url: "https://cdn2.thecatapi.com/images/rs.jpg",
          width: 480,
          height: 640,
        },
        {
          id: "27l",
          url: "https://cdn2.thecatapi.com/images/27l.jpg",
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
          url: "https://cdn2.thecatapi.com/images/2do.jpg",
          width: 500,
          height: 395,
        },
        {
          id: "4d8",
          url: "https://cdn2.thecatapi.com/images/4d8.gif",
          width: 490,
          height: 245,
        },
      ]),
    );
  }),
];
