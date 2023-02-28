import axios from "axios";
import { FOX_API, CAT_API, DOG_API } from "../config";

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

const crawlPhotos = async (numbers = 1) => {
  const fetched: Photo[] = [];

  while (fetched.length < numbers * 3) {
    const [fox, cat, dog] = await Promise.all([getFox(), getCat(), getDog()]);

    fetched.push({
      type: "fox",
      url: fox.data.link,
    });

    fetched.push({
      type: "cat",
      url: cat.data.file,
    });

    fetched.push({
      type: "dog",
      url: dog.data.message,
    });
  }

  return fetched;
};

export { crawlPhotos };
