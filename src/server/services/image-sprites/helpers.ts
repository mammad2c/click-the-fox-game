export const getAnimalFileNameByFilePath = (filePath: string) => {
  const split = filePath.split("/");

  return split[split.length - 1];
};

export const getAnimalTypeByFileName = (fileName: string) => {
  const type = fileName.split("-")[0];

  return type.toLowerCase();
};
