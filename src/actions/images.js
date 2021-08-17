import { SET_IMAGE } from "./types";

export const setImage = (image, index) => ({
  type: SET_IMAGE,
  image,
  index,
});
