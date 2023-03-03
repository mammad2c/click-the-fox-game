import type { Request, Response } from "express";
import { crawlPhotos, imageSprites } from "../../services/";

class PhotosController {
  async index(req: Request, res: Response) {
    try {
      await crawlPhotos();
      const response = await imageSprites();
      return res.json(response);
    } catch (err) {
      return res.status(500).json({
        error: (err as Error).message,
      });
    }
  }
}

export { PhotosController };
