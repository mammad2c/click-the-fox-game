import type { Request, Response } from "express";
import { crawlPhotos, imageSprites } from "../../services/";
import fs from "fs";
import { MAX_FILE_COUNT_CACHED, photosPath } from "../../../config";

class PhotosController {
  async index(req: Request, res: Response) {
    try {
      const files = fs.readdirSync(photosPath, {
        withFileTypes: true,
      });

      if (files.length < MAX_FILE_COUNT_CACHED) {
        await crawlPhotos();
        const response = await imageSprites();
        return res.json(response);
      } else {
        const response = await imageSprites();
        return res.json(response);
      }
    } catch (err) {
      return res.status(500).json({
        error: (err as Error).message,
      });
    }
  }
}

export { PhotosController };
