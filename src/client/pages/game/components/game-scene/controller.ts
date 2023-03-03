import { api } from "@/client/services";
import { useEffect, useReducer, useState } from "react";
import type {
  CoordinateObj,
  ImageSpriteResponseObj,
  PhotoSchema,
} from "@/server/services";
import { initialPhotosState } from "./config";
import { action, PhotosState } from "./types";
import { winnerTypes } from "@/config";

const debounce = (fn: (...args: unknown[]) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const imagesReducer = (state: PhotosState, action: action) => {
  switch (action.type) {
    case "new-photo": {
      const { payload } = action;

      if (!payload) {
        return state;
      }

      const { coordinates, imageSpriteFileName } =
        payload as ImageSpriteResponseObj;

      return {
        isReady: true,
        currentCoordinates: coordinates,
        currentFile: imageSpriteFileName,
      };
    }

    default: {
      return state;
    }
  }
};

const useGameSceneController = () => {
  const [{ isReady, currentFile, currentCoordinates }, dispatchPhotoState] =
    useReducer(imagesReducer, initialPhotosState);

  const [score, setScore] = useState(0);

  const fetchPhotos = debounce(() => {
    api({
      url: "photos",
    }).then((res) => {
      dispatchPhotoState({
        type: "new-photo",
        payload: res.data,
      });
    });
  }, 500);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const calculateScore = (type: string) => {
    setScore((currentScore) => {
      if (winnerTypes.includes(type)) {
        return currentScore + 1;
      } else {
        return currentScore - 1;
      }
    });
  };

  return {
    score,
    currentFile,
    currentCoordinates,
    isReady,
    dispatchPhotoState,
    calculateScore,
  };
};

export { useGameSceneController };
