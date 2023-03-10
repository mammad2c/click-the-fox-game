import { api } from "@/client/services";
import { useEffect, useReducer, useRef, useState } from "react";
import type { ImageSpriteResponseObj } from "@/server/services";
import { initialPhotosState, maxPreloadFiles } from "./config";
import { action, PhotosState } from "./types";
import { winnerTypes } from "@/config";
import { gameStore, scoreboardStore } from "@/client/stores";
import { useNavigate } from "react-router-dom";
import { debounce } from "@/shared";

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

    case "finish": {
      return { ...initialPhotosState, isFinished: true };
    }

    case "restart": {
      return initialPhotosState;
    }

    case "fetch-error": {
      return { ...state, errorsCount: state.errorsCount + 1 };
    }

    default: {
      return state;
    }
  }
};

const useGameSceneController = () => {
  const [
    {
      isReady,
      currentFileName,
      currentCoordinates,
      preloadFiles,
      isFinished,
      errorsCount,
    },
    dispatchPhotoState,
  ] = useReducer(imagesReducer, initialPhotosState);

  const preloadInterval = useRef<NodeJS.Timer | null>(null);

  const numberOfFetches = useRef<number>(0);

  const [score, setScore] = useState(0);

  const scoreRef = useRef(score);

  const [isClickedOnPlayButton, setIsClickedOnPlayButton] = useState(false);

  const cancelControllers = useRef<AbortController[]>([]);

  const navigate = useNavigate();

  const stopFetchPreloadFiles = () => {
    if (preloadInterval.current) {
      clearInterval(preloadInterval.current);
    }
  };

  const fetchPhotos = debounce(() => {
    const controller = new AbortController();

    cancelControllers.current.push(controller);

    api({
      url: "photos",
      signal: controller.signal,
    })
      .then((res) => {
        cancelControllers.current = cancelControllers.current.filter(
          (item) => item !== controller,
        );

        dispatchPhotoState({
          type: "new-photo",
          payload: res.data,
        });
      })
      .catch(() => {
        dispatchPhotoState({
          type: "fetch-error",
        });
      });
  }, 100);

  const startFetchPreloadPhotos = () => {
    stopFetchPreloadFiles();

    preloadInterval.current = setInterval(() => {
      if (
        preloadFiles.length < maxPreloadFiles &&
        numberOfFetches.current < maxPreloadFiles &&
        !isFinished
      ) {
        fetchPhotos();
        numberOfFetches.current += 1;
      }
    }, 150);

    if (isReady && !canGameGetStarted) {
      dispatchPhotoState({ type: "create-current" });
    }
  };

  useEffect(() => {
    startFetchPreloadPhotos();
  }, [preloadFiles.length, isFinished]);

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

  const onFinish = () => {
    scoreboardStore.addNewRecord({
      name: gameStore.getState().name,
      score: scoreRef.current,
    });

    dispatchPhotoState({ type: "finish" });

    gameStore.changeStatus("initial-setup");

    navigate("/scoreboard");
  };

  const handleClickOnPlayButton = () => {
    setIsClickedOnPlayButton(true);

    dispatchPhotoState({
      type: "create-current",
    });
  };

  const handleRestart = () => {
    numberOfFetches.current = 0;

    dispatchPhotoState({
      type: "restart",
    });

    startFetchPreloadPhotos();
  };

  useEffect(() => {
    return () => {
      cancelControllers.current.forEach((cancelController) => {
        cancelController.abort();
      });
      stopFetchPreloadFiles();
    };
  }, []);

  scoreRef.current = score;

  const canGameGetStarted = Boolean(
    currentFileName && currentCoordinates && isReady && !isFinished,
  );

  const preloadFilesLength = preloadFiles.length;

  const progress =
    preloadFilesLength >= maxPreloadFiles
      ? 100
      : Math.floor(100 / maxPreloadFiles) * preloadFilesLength;

  const showThePlayButton = progress >= 100 && !isClickedOnPlayButton;

  const showTheProgressBar = !showThePlayButton && !isReady;

  const isFetchingDuringGame = isReady && !canGameGetStarted;

  const showErrorStatus =
    errorsCount > 0 &&
    (errorsCount >= preloadFilesLength || preloadFilesLength < maxPreloadFiles);

  if (showErrorStatus) {
    stopFetchPreloadFiles();
  }

  return {
    score,
    currentFileName,
    currentCoordinates,
    isReady,
    progress,
    canGameGetStarted,
    showThePlayButton,
    showTheProgressBar,
    isFetchingDuringGame,
    showErrorStatus,
    dispatchPhotoState,
    calculateScore,
    onFinish,
    handleClickOnPlayButton,
    handleRestart,
  };
};

export { useGameSceneController };
