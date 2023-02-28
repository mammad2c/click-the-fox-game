import type { Request, Response } from "express";
import { crawlPhotos } from "../services/crawl-photo";

class PhotosController {
  async index(req: Request, res: Response) {
    const response = await crawlPhotos();

    return res.json(response);
  }
}

export { PhotosController };
