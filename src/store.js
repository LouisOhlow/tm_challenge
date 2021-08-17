import { createStore, combineReducers } from "redux";
import imageReducer from "./reducers/imageReducer";

const rootReducer = combineReducers({
  imageRed: imageReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
