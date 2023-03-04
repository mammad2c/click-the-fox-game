import axios from "axios";
import { FOX_API, CAT_API, DOG_API, photosPath } from "../../../config";
import { PhotoSchema, SingleResourceCatOrDog } from "./types";
import fs from "fs";
import sharp from "sharp";
import http from "https";

const getFox = () => {
  return axios<{ images: string[]; links: string[] }>({
    baseURL: FOX_API,
    url: "getfoxes",
    params: {
      count: 4,
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
      mime_types: "jpg",
    },
    method: "GET",
  });
};

const crawlPhotos = async () => {
  let dogs: PhotoSchema[] = [];
  let cats: PhotoSchema[] = [];
  let foxes: PhotoSchema[] = [];

  const [foxResponse, catsResponse, dogsResponse] = await Promise.allSettled([
    getFox(),
    getCats(),
    getDogs(),
  ]);

  if (foxResponse.status === "fulfilled") {
    foxes = foxResponse.value.data.images.map((imageUrl) => ({
      url: imageUrl,
      type: "fox",
    }));
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

  const photos = [...foxes, ...cats, ...dogs] as PhotoSchema[];

  const downloadableImages = [];

  for (const photo of photos) {
    downloadableImages.push(
      new Promise((resolve, reject) => {
        http
          .get(photo.url, async (response) => {
            const dataBuffer: Uint8Array[] = [];

            response.on("data", function (chunk) {
              dataBuffer.push(chunk);
            });

            response.on("end", function () {
              const bufferedPhoto = Buffer.concat(dataBuffer);

              const { type, url } = photo;
              const fileUrl = new URL(url);
              const splitPathname = fileUrl.pathname.split("/");
              const finalFileName =
                splitPathname[splitPathname.length - 1].split(".")[0];

              if (!fs.existsSync(photosPath)) {
                fs.mkdirSync(photosPath);
              }

              sharp(bufferedPhoto)
                .resize(200, 200)
                .toFormat("jpg", { mozjpeg: true, quality: 60 })
                .toFile(`${photosPath}/${type}-${finalFileName}.jpg`)
                .then(() => {
                  resolve(true);
                })
                .catch(() => {
                  resolve(true);
                });
            });

            response.on("error", (err) => {
              reject(err);
            });

            response.on("close", () => {
              resolve(true);
            });
          })
          .end();
      }),
    );
  }

  await Promise.all(downloadableImages);
};

export { crawlPhotos };
