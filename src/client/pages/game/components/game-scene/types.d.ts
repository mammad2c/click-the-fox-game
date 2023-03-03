import { CoordinateObj } from "@/server/services";

export interface PhotosState {
  currentCoordinates: CoordinateObj[] | undefined;
  currentFile: string | undefined;
  isReady: boolean;
}

export interface action {
  payload?: unknown;
  type: "new-photo";
}
