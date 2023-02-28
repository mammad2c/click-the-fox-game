import type { Request, Response } from "express";
import { crawlPhotos } from "../services/crawl-photos";

class PhotosController {
  async index(req: Request, res: Response) {
    try {
      const response = await crawlPhotos();

      return res.json(response);
    } catch (err) {
      return err;
    }
  }
}

export { PhotosController };
