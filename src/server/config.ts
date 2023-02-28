import * as dotenv from "dotenv";

dotenv.config();

export const { PORT, FOX_API, CAT_API, DOG_API } = process.env;
