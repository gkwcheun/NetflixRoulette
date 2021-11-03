import { combineReducers } from "redux";
import movieReducer from "./movie/movieReducer";
import modalReducer from "./modal/modalReducer";
import movieInfoReducer from "./movieInfo/movieInfoReducer";

const rootReducer = combineReducers({
  movie: movieReducer,
  modal: modalReducer,
  movieInfo: movieInfoReducer,
});

export default rootReducer;
