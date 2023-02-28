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
  rest.get(CAT_API, (req, res, ctx) => {
    return res(
      ctx.json({
        file: "https://purr.objects-us-east-1.dream.io/i/295916_531552919436_290500345_796062_3164864_n.jpg",
      }),
    );
  }),
  rest.get(DOG_API, (req, res, ctx) => {
    return res(
      ctx.json({
        message: "https://images.dog.ceo/breeds/otterhound/n02091635_3552.jpg",
        status: "success",
      }),
    );
  }),
];
