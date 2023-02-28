import axios from "axios";
import { FOX_API, CAT_API, DOG_API } from "../../../config";

const getFox = () => {
  return axios({
    url: FOX_API,
    method: "GET",
  });
};

const getCat = () => {
  return axios({
    url: CAT_API,
    method: "GET",
  });
};

const getDog = () => {
  return axios({
    url: DOG_API,
    method: "GET",
  });
};

interface Photo {
  type: "fox" | "cat" | "dog";
  url: string;
}

const crawlPhotos = async (series = 1) => {
  const fetched: Photo[] = [];

  while (fetched.length < series * 3) {
    const [fox, cat, dog] = await Promise.allSettled([
      getFox(),
      getCat(),
      getDog(),
    ]);

    if (fox.status === "fulfilled") {
      fetched.push({
        type: "fox",
        url: fox.value.data.link,
      });
    }

    if (cat.status === "fulfilled") {
      fetched.push({
        type: "cat",
        url: cat.value.data.file,
      });
    }

    if (dog.status === "fulfilled") {
      fetched.push({
        type: "dog",
        url: dog.value.data.message,
      });
    }
  }

  return fetched;
};

export { crawlPhotos };
