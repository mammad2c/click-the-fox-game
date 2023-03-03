import { CoordinateObj, ImageSpriteResponseObj } from "@/server/services";

export interface PhotosState {
  currentCoordinates: CoordinateObj[] | undefined;
  currentFileName: string | undefined;
  isReady: boolean;
  preloadFiles: ImageSpriteResponseObj[];
  isFinished: boolean;
}

export interface action {
  payload?: unknown;
  type: "new-photo" | "create-current" | "finish";
}
