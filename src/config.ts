import * as dotenv from "dotenv";
import * as path from "path";

if (typeof process !== "undefined") {
  dotenv.config();
} else {
  (window as unknown as Record<string, unknown>).process = { env: {} };
}

export const photosPath =
  typeof path === "object" && typeof path.join === "function"
    ? path.join("public", "photos")
    : "";

export const { PORT, FOX_API = "", CAT_API = "", DOG_API = "" } = process.env;

export const winnerTypes = ["fox"];
