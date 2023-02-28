import type { Express } from "express";

// controllers
import { PhotosController } from "./controllers/photos.controller";

const router = (app: Express) => {
  // define your routes and map to your controllers
  app.get("/photos", new PhotosController().index);
};

export { router };
