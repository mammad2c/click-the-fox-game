import { api } from "@/client/services";
import { useEffect, useReducer, useRef, useState } from "react";
import type { ImageSpriteResponseObj } from "@/server/services";
import { initialPhotosState, maxPreloadFiles } from "./config";
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

      return {
        ...state,
        preloadFiles: [
          ...state.preloadFiles,
          payload as ImageSpriteResponseObj,
        ],
      };
    }

    case "create-current": {
      const current = state.preloadFiles[0];

      return {
        ...state,
        currentFileName: current?.imageSpriteFileName,
        currentCoordinates: current?.coordinates,
        preloadFiles: state.preloadFiles.slice(1),
        isReady: true,
      };
    }

    default: {
      return state;
    }
  }
};

const useGameSceneController = () => {
  const [
    { isReady, currentFileName, currentCoordinates, preloadFiles },
    dispatchPhotoState,
  ] = useReducer(imagesReducer, initialPhotosState);

  const preloadInterval = useRef<NodeJS.Timer | null>(null);
  const numberOfFetches = useRef<number>(0);

  const [score, setScore] = useState(0);

  const canGameGetStarted = Boolean(
    currentFileName && currentCoordinates && isReady,
  );

  const flag = useRef(false);

  const stopFetchPreloadFiles = () => {
    if (preloadInterval.current) {
      clearInterval(preloadInterval.current);
    }
  };

  const fetchPhotos = debounce(() => {
    api({
      url: "photos",
    })
      .then((res) => {
        dispatchPhotoState({
          type: "new-photo",
          payload: res.data,
        });
      })
      .catch(() => {
        numberOfFetches.current -= 1;
      });
  }, 300);

  useEffect(() => {
    preloadInterval.current = setInterval(() => {
      if (
        preloadFiles.length < maxPreloadFiles &&
        numberOfFetches.current < maxPreloadFiles
      ) {
        fetchPhotos();
        numberOfFetches.current += 1;
      }
    }, 500);

    if (preloadFiles.length === maxPreloadFiles && !flag.current) {
      flag.current = true;
      dispatchPhotoState({
        type: "create-current",
      });
    }

    return () => {
      stopFetchPreloadFiles();
    };
  }, [preloadFiles.length]);

  const calculateScore = (type: string) => {
    setScore((currentScore) => {
      if (winnerTypes.includes(type)) {
        return currentScore + 1;
      } else {
        return currentScore - 1;
      }
    });

    dispatchPhotoState({
      type: "create-current",
    });
    numberOfFetches.current -= 3;
  };

  return {
    score,
    currentFileName,
    currentCoordinates,
    isReady,
    canGameGetStarted,
    dispatchPhotoState,
    calculateScore,
  };
};

export { useGameSceneController };
