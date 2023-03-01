import { api } from "@/client/services";
import { useEffect, useReducer, useState } from "react";
import type { PhotoSchema } from "@/server/services";
import { initialPhotosState, winnerTypes } from "./config";
import { action, PhotosState } from "./types";

const generateSelectablePhotos = (data: PhotoSchema[]) => {
  const { winners, others } = data.reduce<{
    winners: PhotoSchema[];
    others: PhotoSchema[];
  }>(
    (acc, item) => {
      if (winnerTypes.includes(item.type)) {
        return {
          ...acc,
          winners: [...acc.winners, item],
        };
      }

      return {
        ...acc,
        others: [...acc.others, item],
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

  const selectedOthers = others
    .sort(function () {
      return 0.5 - Math.random();
    })
    .slice(0, 8);

  const shuffledArray = [selectedWinner, ...selectedOthers].sort(function () {
    return 0.5 - Math.random();
  });

  return shuffledArray;
};

const imagesReducer = (state: PhotosState, action: action) => {
  switch (action.type) {
    case "new-photos": {
      const { payload } = action;

      if (!payload || !Array.isArray(payload)) {
        return state;
      }

      const allPhotos = [...state.allPhotos, ...payload].filter(
        (item, index, array) => {
          const foundIndex = array.findIndex((i) => i.url === item.url);
          return foundIndex === index;
        },
      );

      const selectablePhotos = generateSelectablePhotos(allPhotos);

      return {
        isReady: true,
        allPhotos,
        selectablePhotos,
      };
    }

    default: {
      return state;
    }
  }
};

const useGameSceneController = () => {
  const [{ allPhotos, isReady, selectablePhotos }, dispatchPhotoState] =
    useReducer(imagesReducer, initialPhotosState);

  const [score, setScore] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    api({
      url: "photos",
    }).then((res) => {
      if (!isCurrent) {
        return;
      }

      dispatchPhotoState({
        type: "new-photos",
        payload: res.data,
      });
    });

    return () => {
      isCurrent = false;
    };
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
    allPhotos,
    isReady,
    selectablePhotos,
    dispatchPhotoState,
    calculateScore,
  };
};

export { useGameSceneController };
