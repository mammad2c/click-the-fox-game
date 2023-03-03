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

const { MAX_FILE_COUNT_CACHED: rawMaxFileCountCached } = process.env;

export const MAX_FILE_COUNT_CACHED = rawMaxFileCountCached
  ? Number(rawMaxFileCountCached)
  : 60;

export const winnerTypes = ["fox"];
