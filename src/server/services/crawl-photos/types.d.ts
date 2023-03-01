export interface SingleResourceCatOrDog {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface PhotoSchema {
  type: "fox" | "cat" | "dog" | string;
  url: string;
}
