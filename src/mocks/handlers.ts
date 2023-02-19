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
];
