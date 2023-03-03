import * as spritesmith from "spritesmith";

type ValueOf<T> = T[keyof T];

type FileNameInCoordinateObj = {
  type: string;
  id: string;
};

export type CoordinateObj = ValueOf<
  spritesmith.SpritesmithResult["coordinates"]
> &
  FileNameInCoordinateObj;

export interface ImageSpriteResponseObj {
  coordinates: CoordinateObj[];
  imageSpriteFileName: string;
}
