import { photosPath, winnerTypes } from "../../../config";
import fs from "fs";
import sharp from "sharp";
import spritesmith from "spritesmith";
import shuffle from "lodash.shuffle";
import { uuid4 } from "../../../shared";
import { CoordinateObj, ImageSpriteResponseObj } from "./types";
import {
  getAnimalFileNameByFilePath,
  getAnimalTypeByFileName,
} from "./helpers";

const generateSelectablePhotos = (data: fs.Dirent[]) => {
  const { winners, others } = data
    .filter((item) => !item.name.includes("sprite-"))
    .reduce<{
      winners: string[];
      others: string[];
    }>(
      (acc, item) => {
        const fileUrl = `${photosPath}/${item.name}`;
        const type = getAnimalTypeByFileName(item.name);
        const isWinnerType = winnerTypes.includes(type);

        const key = isWinnerType ? "winners" : "others";

        return {
          ...acc,
          [key]: [...acc[key], fileUrl],
        };
      },
      {
        winners: [],
        others: [],
      },
    );

  const winnersLength = winners.length;
  const selectedWinnerIndex = Math.floor(Math.random() * winnersLength);
  const selectedWinner = winners[selectedWinnerIndex];
  const selectedOthers = shuffle(others).slice(0, 8);
  const shuffledArray = shuffle([selectedWinner, ...selectedOthers]);

  return shuffledArray;
};

const promiseSprite = (photos: string[]) =>
  new Promise<ImageSpriteResponseObj>((resolve, reject) => {
    spritesmith.run(
      {
        src: photos,
      },
      async (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        const id = uuid4();
        const imageSpriteFileName = `${photosPath}/sprite-${id}.jpg`;

        await sharp(result.image).toFormat("jpg").toFile(imageSpriteFileName);

        const coordinates: CoordinateObj[] = [];

        Object.keys(result.coordinates).forEach((fileUrl) => {
          const coordinateObj = result.coordinates[fileUrl];
          const fileName = getAnimalFileNameByFilePath(fileUrl);
          const type = getAnimalTypeByFileName(fileName);

          coordinates.push({ ...coordinateObj, type, id: uuid4() });
        });

        resolve({
          coordinates,
          imageSpriteFileName: imageSpriteFileName.replace("public", ""),
        });
      },
    );
  });

const imageSprites = async () => {
  const files = fs.readdirSync(photosPath, {
    withFileTypes: true,
  });

  const selectablePhotos = generateSelectablePhotos(files);
  const response = await promiseSprite(selectablePhotos);

  return response;
};

export { imageSprites };
