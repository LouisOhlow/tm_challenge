import { SET_IMAGE } from "../actions/types";

const initialState = {
  images: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      const images = [...state.images];
      images[action.index] = action.image;
      return {
        ...state,
        images,
      };
    default:
      return state;
  }
};

export default imageReducer;
