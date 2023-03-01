export interface PhotosState {
  allPhotos: PhotoSchema[];
  selectablePhotos: PhotoSchema[];
  isReady: boolean;
}

export interface action {
  payload?: unknown;
  type: "new-photos";
}
