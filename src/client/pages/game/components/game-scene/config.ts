import { PhotosState } from "./types";

export const initialPhotosState: PhotosState = {
  currentCoordinates: undefined,
  currentFileName: undefined,
  isReady: false,
  preloadFiles: [],
  isFinished: false,
};

export const maxPreloadFiles = 5;

export const gameDuration =
  import.meta.env.MODE.toLowerCase() === "test" ? 1 : 30; // in seconds
