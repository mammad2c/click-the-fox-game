import { PhotosState } from "./types";

export const initialPhotosState: PhotosState = {
  currentCoordinates: undefined,
  currentFileName: undefined,
  isReady: false,
  preloadFiles: [],
};

export const maxPreloadFiles = 5;
