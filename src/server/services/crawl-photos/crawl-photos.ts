import axios from "axios";
import { FOX_API, CAT_API, DOG_API } from "../../../config";
import { PhotoSchema, SingleResourceCatOrDog } from "./types";

const getFox = () => {
  return axios({
    url: FOX_API,
    params: {
      count: 1,
    },
    method: "GET",
  });
};

const getCats = () => {
  return axios<SingleResourceCatOrDog[]>({
    baseURL: CAT_API,
    url: "images/search",
    params: {
      limit: 10,
    },
    method: "GET",
  });
};

const getDogs = () => {
  return axios<SingleResourceCatOrDog[]>({
    baseURL: DOG_API,
    url: "images/search",
    params: {
      limit: 10,
    },
    method: "GET",
  });
};

const crawlPhotos = async () => {
  let dogs: PhotoSchema[] = [];
  let cats: PhotoSchema[] = [];
  let fox = {};

  const [foxResponse, catsResponse, dogsResponse] = await Promise.allSettled([
    getFox(),
    getCats(),
    getDogs(),
  ]);

  if (foxResponse.status === "fulfilled") {
    fox = {
      type: "fox",
      url: foxResponse.value.data.image,
    };
  }

  if (catsResponse.status === "fulfilled") {
    cats = catsResponse.value.data.map((cat) => ({
      type: "cat",
      url: cat.url,
    }));
  }

  if (dogsResponse.status === "fulfilled") {
    dogs = dogsResponse.value.data.map((dog) => ({
      type: "dog",
      url: dog.url,
    }));
  }

  const result = [fox, ...cats, ...dogs];

  return result;
};

export { crawlPhotos };
