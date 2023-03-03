import axios from "axios";
import { FOX_API, CAT_API, DOG_API, photosPath } from "../../../config";
import { PhotoSchema, SingleResourceCatOrDog } from "./types";
import fs from "fs";
import sharp from "sharp";

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
      size: "small",
      mime_types: "jpg",
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
      size: "small",
      mime_types: "jpg",
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
    cats = catsResponse.value.data.slice(0, 4).map((cat) => ({
      type: "cat",
      url: cat.url,
    }));
  }

  if (dogsResponse.status === "fulfilled") {
    dogs = dogsResponse.value.data.slice(0, 4).map((dog) => ({
      type: "dog",
      url: dog.url,
    }));
  }

  const photos = [fox, ...cats, ...dogs] as PhotoSchema[];

  const downloadableImages = [];

  for (const photo of photos) {
    downloadableImages.push(
      Promise.resolve(
        axios({
          url: photo.url,
          maxContentLength: -1,
          maxBodyLength: -1,
          responseType: "arraybuffer",
          params: {
            type: photo.type,
          },
        }),
      ),
    );
  }

  const bufferedPhotos = await Promise.all(downloadableImages);

  const convertiblePhotos = [];

  for (const bufferedPhoto of bufferedPhotos) {
    const url = new URL(bufferedPhoto.config.url as string);
    const splitPathname = url.pathname.split("/");
    const finalFileName = splitPathname[splitPathname.length - 1].split(".")[0];
    const { type } = bufferedPhoto.config.params;

    if (!fs.existsSync(photosPath)) {
      fs.mkdirSync(photosPath);
    }

    convertiblePhotos.push(
      Promise.resolve(
        sharp(bufferedPhoto.data)
          .resize(200, 200)
          .toFormat("jpg", { mozjpeg: true, quality: 60 })
          .toFile(`${photosPath}/${type}-${finalFileName}.jpg`),
      ),
    );
  }

  await Promise.all(convertiblePhotos);
};

export { crawlPhotos };
